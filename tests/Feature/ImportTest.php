<?php

use App\Models\User;
use App\Models\Import;
use App\Models\Device;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

test('a user can upload an importable CSV file', function (): void {
    Excel::fake();
    Storage::fake('local');

    $user = User::factory()->create();

    // User has no imports
    $this->expect(Import::where('user_id', $user->id)->count())->toBe(0);

    // File is uploaded
    $csv = UploadedFile::fake()->create('data-upload.csv', 1000);

    $response = $this->actingAs($user)
                     ->post(route('import.store'),  ['file' => $csv]);

    $response->assertOk();

    Excel::assertImported('data-upload.csv');

    // Import is logged
    $this->expect(Import::where('user_id', $user->id)->where('filename', 'data-upload.csv')->count())->toBe(1);

    // File is saved to disk
    Storage::disk('local')->assertExists('data-upload.csv');
});

test('a user can delete an upload and devices will be removed automatically', function(): void {
    Storage::fake('local');

    $csv = UploadedFile::fake()->create('data-upload.csv', 1000);

    Storage::put('to-be-deleted-devices.csv', $csv);

    $user = User::factory()->create();

    $import = Import::create([
        'user_id' => $user->id,
        'filename' => 'to-be-deleted-devices.csv'
    ]);

    $devices = Device::factory()->count(10)->create([
        'import_id' => $import->id
    ]);

    $this->assertCount(10, Device::all());

    $response = $this->actingAs($user)
                     ->delete(route('import.destroy', ['import' => $import]));

    $response->assertOk();

    $this->assertCount(0, Device::all());

    Storage::disk('local')->assertMissing('data-upload.csv');
});
