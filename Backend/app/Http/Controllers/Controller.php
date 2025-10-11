<?php

namespace App\Http\Controllers;


abstract class Controller
{

    public function ResponseMessage(
        string $status = 'success',
        string $message = "",
        $data = null,
        int $errCode = 200
    )
    {
        return response()->json([
            'status' => $status,
            'message' => $message,
            'data' => $data,
        ], $errCode);
    }
}
