<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUpdateDeviceRequest;
use App\Models\Device;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class DeviceAPIController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Response(['devices' => Device::paginate(50)]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUpdateDeviceRequest $request)
    {
        Device::create($request->validated());

        return Response('Device created successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $device = Device::findOrFail($id);

        return Response(['device' => $device]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreUpdateDeviceRequest $request, Device $device)
    {
        $device->update($request->validated());

        return Response(['device' => $device]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Device $device)
    {
        $device->delete();

        return Response('Device deleted successfully!');
    }
}
