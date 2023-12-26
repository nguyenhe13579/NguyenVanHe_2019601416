<h2>Cám ơn bạn đã đặt hàng, {{$order->full_name}}</h2>
<p>Mã đơn của bạn: {{$order->id}}</p>
<h3>Thông tin người mua hàng</h3>
<table>
    <tr>
        <th>Họ tên</th>
        <th>Địa chỉ</th>
        <th>Số điện thoại</th>
        <th>Email</th>
    </tr>
    <tr>
        <td>{{$order->full_name}}</td>
        <td>{{$order->address}}</td>
        <td>0{{$order->phone}}</td>
        <td>{{$order->email}}</td>
    </tr>
</table>
<h3>Thông tin đơn hàng</h3>
<table>
    <tr>
        <th>Mã sản phẩm</th>
        <th>Tên sản phẩm</th>
        <th>Giá</th>
        <th>Số lượng</th>
        <th>Thành tiền</th>
    </tr>
    @foreach($orderDetail as $product)
    <tr>
        <td>{{$product->id}}</td>
        <td>{{$product->name}}</td>
        <td>{{$product->price}}</td>
        <td>{{$product->quantity}}</td>
        <td>{{$product->price * $product->quantity}}</td>
    </tr>
    @endforeach
</table>
<h3>Tổng tiền: {{$order->total_price}} VND</h3>
<h4>Đây là Email trả lời tự động của hệ thống, quý khách vui lòng không trả lời Email này</h4>