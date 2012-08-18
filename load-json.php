<?php
// to get around same origin access control problem with cross domain ajax requests in js
echo file_get_contents("http://api.ihackernews.com/page");
?>