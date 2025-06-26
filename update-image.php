<?php
require 'db.php';

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Accept");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $image_id = $_POST['image_id'] ?? null;
    $title = $_POST['title'] ?? '';
    $category = $_POST['category'] ?? '';

    if (!$image_id || !is_numeric($image_id)) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid image ID']);
        exit();
    }

    // Get current file path
    $stmt = $pdo->prepare("SELECT file_path FROM images WHERE id = ?");
    $stmt->execute([$image_id]);
    $row = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$row) {
        http_response_code(404);
        echo json_encode(['error' => 'Image not found']);
        exit();
    }

    $file_path = $row['file_path'];
    $new_file_path = $file_path;

    // Handle file upload (if a new file is provided)
    if (isset($_FILES['file']) && $_FILES['file']['error'] === UPLOAD_ERR_OK) {
        $uploadDir = __DIR__ . '/../public/uploads/';
        $ext = pathinfo($_FILES['file']['name'], PATHINFO_EXTENSION);
        $newFileName = 'img_' . uniqid() . '.' . $ext;
        $destination = $uploadDir . $newFileName;

        if (move_uploaded_file($_FILES['file']['tmp_name'], $destination)) {
            // Delete old file if it exists
            $oldFile = $uploadDir . basename($file_path);
            if (file_exists($oldFile)) {
                unlink($oldFile);
            }
            $new_file_path = '/uploads/' . $newFileName;
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to upload new image file']);
            exit();
        }
    }

    // Update the database
    $stmt = $pdo->prepare("UPDATE images SET title = ?, category = ?, file_path = ? WHERE id = ?");
    $stmt->execute([$title, $category, $new_file_path, $image_id]);

    // Fetch updated image
    $stmt = $pdo->prepare("SELECT id, album_id, title, file_path, category, likes FROM images WHERE id = ?");
    $stmt->execute([$image_id]);
    $updated = $stmt->fetch(PDO::FETCH_ASSOC);

    echo json_encode(['data' => $updated]);
    exit();
}
?> 