<?php

use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

test('a user can upload an importable CSV file', function (): void {
    $user = User::factory()->create();

    Storage::fake('csv-uploads');

    $csv = UploadedFile::fake()->create('data-upload.csv', 1000);

    $response = $this->actingAs($user)
                     ->post(route('import.store'),  ['file' => $csv]);

    $response->assertOk();

    Storage::disk('csv-uploads')->assertExists($csv->hashName());
});

test('a user can delete an upload and devices will be removed automatically', function(): void {

});
