<?php

use App\Models\User;
use App\Models\Import;
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

});
