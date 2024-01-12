<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreImportRequest;
use App\Models\Import;
use App\Imports\DevicesImport;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use Illuminate\Support\Facades\Storage;

class ImportController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreImportRequest $request)
    {
        Storage::put($request->validated('file')->getClientOriginalName(), $request->validated('file'));
        
        $import = Import::create(
            [
                'filename' => $request->validated('file')->getClientOriginalName(),
                'user_id' => Auth::user()->id
            ]
        );

        $devices = Excel::import(new DevicesImport($import->id), $request->validated('file'));

        $import->update([
            'completed_at' => Carbon::now()
        ]);

        return back()->with([
            'message' => 'Import submitted and added to the Queue Successfully! Please note large imports may take a little while, so check back soon!'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(import $import)
    {
        $import->delete();

        Storage::delete($import->filename);

        return back()->with([
            'message' => 'Import deleted successfully.'
        ]);
    }
}
