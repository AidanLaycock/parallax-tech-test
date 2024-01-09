<?php

use App\Models\User;
use App\Models\Device;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

test('a user can upload an importable CSV file', function (): void {
    Excel::fake();
    
    $user = User::factory()->create();

    $csv = UploadedFile::fake()->create('data-upload.csv', 1000);

    $response = $this->actingAs($user)
                     ->post(route('import.store'),  ['file' => $csv]);

    $response->assertOk();

    Excel::assertImported('data-upload.csv');
});

test('a user can delete an upload and devices will be removed automatically', function(): void {

});
