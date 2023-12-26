<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Users;

class UserController extends Controller
{
    public function newUser()
    {
        $user = Users::orderby('created_at', 'desc')->first();

        return response()->json([
            'message' => 'Success',
            'result' => $user
        ]);
    }

    public function register(Request $request)
    {
        $this->validate($request, [
            'username' => 'required',
            'password' => 'required|min:6',
            'full_name' => 'required',
            'email' => 'required|email',
            'gender' => 'required'
        ]);

        $user = Users::create($request->input());

        return response()->json([
            'message' => 'Register success',
            'result' => $user
        ]);
    }

    public function login(Request $request)
    {
        $this->validate($request, [
            'username' => 'required',
            'password' => 'required|min:6'
        ]);

        $user = Users::query()->where([
            'username' => $request['username'],
            'password' => $request['password']
        ])->get();

        if (count($user) === 0)
            $message = 'Username or password is incorrect!';
        else
            $message = 'Login successfully!';

        return response()->json([
            'message' => $message,
            'result' => $user
        ]);
    }

    public function changePassword(Request $request)
    {
        $user = Users::query()->where('username', $request['username'])->firstOrFail();
        if ($user->password !== $request['old_password'])
            return response()->json([
                'errors' => 'Mật khẩu không đúng',
                'success' => false,
                'message' => 'Input error',
            ], 422);

        $user->password = $request->input('new_password');

        $user->save();

        return response()->json([
            'message' => 'Change password success',
            'result' => $user
        ]);
    }

    public function update(Request $request, $id)
    {
        $this->validate($request, [
            'email' => 'required',
            'full_name' => 'required'
        ]);

        $user = Users::find($id);
        $user->fill($request->input());

        $user->save();

        return response()->json([
            'message' => 'Update success',
            'result' => $user
        ]);
    }
}
