<?php
$target_dir = "../files/";
$target_file = $target_dir . basename($_FILES["file"]["name"]);

// Check if file already exists
if (file_exists($target_file)) {
  die("Sorry, file already exists.");
}

if (move_uploaded_file($_FILES["file"]["tmp_name"], $target_file)) {
echo "The file ". htmlspecialchars( basename( $_FILES["file"]["name"])). " has been uploaded.<br><a href='../'>Back</a>";
} else {
echo "Sorry, there was an error uploading your file.";
}
?>