<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "grocery"; //database name

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $brand = $_POST['BrandName'];
    $name = $_POST['Name'];
    $mrp = $_POST['MRP'];
    $final_price = $_POST['FinalPrice'];
    $discount = $_POST['Discount'];
    $category = $_POST['Catagary'];
    $description = $_POST['Discripsion'];

    // Image Upload Handling
    $image = "";
    if (isset($_FILES['addImg']) && $_FILES['addImg']['error'] == 0) {
        $image = "uploads/" . basename($_FILES["addImg"]["name"]);
        move_uploaded_file($_FILES["addImg"]["tmp_name"], $image);
    }

    $sql = "INSERT INTO products (image, brand_name, product_name, mrp, final_price, discount, category, description) 
            VALUES ('$image', '$brand', '$name', '$mrp', '$final_price', '$discount', '$category', '$description')";

    if ($conn->query($sql) === TRUE) {
        echo "New product added successfully!";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

$conn->close();
?>
