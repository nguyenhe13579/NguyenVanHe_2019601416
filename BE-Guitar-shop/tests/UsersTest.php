<?php

use Laravel\Lumen\Testing\DatabaseMigrations;
use Tests\TestCase;
use App\Models\Users;

class UsersTest extends TestCase
{
    use DatabaseMigrations;

    public function setUp(): void
    {
        parent::setUp();
        Users::newFactory()->count(10)->create();
    }

    public function testRegister()
    {
        $response = $this->call('POST', 'user/register', [
            'username' => 'huynd',
            'password' => '123456',
            'full_name' => 'Nguyen Duc Huy',
            'email' => 'duc4422@gmail.com',
            'gender' => 0
        ]);

        $user = json_decode($response->content());

        $this->assertEquals(200, $response->status());
        $this->seeInDatabase('users', ['id' => $user->result->id]);
    }

    public function testRegisterNoData()
    {
        $response = $this->call('POST', 'user/register', [
            'username' => '',
            'password' => '',
            'full_name' => '',
            'email' => '',
            'gender' => 0
        ]);

        $this->assertEquals(422, $response->status());
    }

    public function testGetLatestUser()
    {
        $user = json_decode(Users::orderby('created_at', 'desc')->first());

        $response = $this->call('POST', 'new-user');
        $manage = json_decode($response->content());

        $this->assertEquals(200, $response->status());
        $this->assertEquals($user, $manage->result);
    }

    public function testLogin()
    {
        $user = Users::orderby('created_at', 'desc')->first();
        $response = $this->call('POST', 'user/login', [
            'username' => $user->username,
            'password' => $user->password
        ]);
        $user = json_decode($user);
        $manage = json_decode($response->content());

        $this->assertEquals(200, $response->status());
        $this->assertEquals($user, $manage->result[0]);
    }

    public function testLoginFailed()
    {
        $response = $this->call('POST', 'user/login', [
            'username' => '',
            'password' => ''
        ]);

        $this->assertEquals(422, $response->status());
    }

    public function testChangePassword()
    {
        $user = Users::first();
        $response = $this->call('POST', "user/change-password", [
            'username' => $user->username,
            'old_password' => $user->password,
            'new_password' => 'duchuy123'
        ]);

        $manage = json_decode($response->content());
        $check = json_decode(Users::find($user->id));

        $this->assertEquals(200, $response->status());
        $this->assertEquals($check, $manage->result);
    }

    public function testChangePasswordFailed()
    {
        $user = Users::first();
        $response = $this->call('POST', "user/change-password", [
            'username' => $user->username,
            'old_password' => '123456',
            'new_password' => 'duchuy123'
        ]);

        $this->assertEquals(422, $response->status());
    }

    public function testUpdateUser()
    {
        $user = Users::first();
        $id = $user->id;

        $response = $this->call('POST', "user/update/$id", [
            'full_name' => 'Huy',
            'email' => 'Duc4422@gmail.com',
            'phone' => 362274026,
            'address' => 'Ha Noi',
            'gender' => 0,
            'birth' => '16-02-2001'
        ]);
        $manage = json_decode($response->content());
        $check = json_decode(Users::find($id));

        $this->assertEquals(200, $response->status());
        $this->assertEquals($check, $manage->result);
    }

    public function testUpdateNoData()
    {
        $user = Users::first();
        $id = $user->id;

        $response = $this->call('POST', "user/update/$id", [
            'full_name' => '',
            'email' => '',
            'phone' => '',
            'address' => '',
            'gender' => '',
            'birth' => ''
        ]);

        $this->assertEquals(422, $response->status());
    }
}
