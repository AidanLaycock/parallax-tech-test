<?php

use App\Models\Device;
use App\Models\User;

test('a user can retrieve all devices (single page)', function(): void {
    $user = User::factory()->create();

    $devices = Device::factory(5)->create();
    $this->assertDatabaseCount('devices', 5);

    $response = $this->actingAs($user)
                     ->get(route('device.index'));

    $response->assertOk();

    $this->expect(count($response->getOriginalContent()['devices']))->toBe(5);
});

test('a user can retrieve all devices, in paginated format', function(): void {
    $user = User::factory()->create();

    $devices = Device::factory(101)->create();
    $this->assertDatabaseCount('devices', 101);

    $response = $this->actingAs($user)
                     ->get(route('device.index'));

    $response->assertOk();

    $this->expect($response['devices']['last_page'])->toBe(3);
    $this->expect($response['devices']['total'])->toBe(101);
});

test('a user can retrieve a single device record', function (): void {
    $user = User::factory()->create();

    $device = Device::factory()->create();

    $response = $this->actingAs($user)
                     ->get(route('device.show', ['device' => $device->id]));

    $response->assertOk();
});

test('a user can create a new device', function (): void {
    $user = User::factory()->create();

    $device = Device::factory()->make();

    $response = $this->actingAs($user)
                     ->post(route('device.store', $device->toArray()));

    $response->assertOk();

    $this->assertDatabaseCount('devices', 1);
});

test('a user can update a device', function(): void {
    $user = User::factory()->create();

    $initialDevice = Device::factory()->create();

    $device = Device::factory()->make();

    $response = $this->actingAs($user)
                     ->patch(route('device.update', $initialDevice->id), $device->toArray());

    $response->assertOk();

    $this->assertDatabaseCount('devices', 1);
});

test('a user must include all required properties when creating a device', function($nullValue): void {
    $user = User::factory()->create();

    $device = Device::factory()->make([$nullValue => null]);

    $response = $this->actingAs($user)
                     ->post(route('device.store', $device->toArray()));

    $response->assertStatus(302);

    $this->expect($response)->assertSessionHasErrors($nullValue);

    $this->assertDatabaseCount('devices', 0);
})->with([
    ['name'],
    ['address'],
    ['longitude'],
    ['latitude'],
    ['device_type'],
    ['manufacturer'],
    ['model'],
    ['install_date'],
    ['note'],
    ['eui'],
    ['serial_number']
]);

test('a user can delete a device', function(): void {
    $user = User::factory()->create();

    $device = Device::factory()->create();

    $this->assertDatabaseCount('devices', 1);

    $response = $this->actingAs($user)
                     ->delete(route('device.destroy', $device->id));

    $response->assertOk();

    $this->assertDatabaseCount('devices', 0);
});
