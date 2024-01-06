param(
    [string]$username,
    [string]$firstname,
    [string]$lastname,
    [string]$email,
    [string]$password
)

$body = @{
    username = $username
    firstname = $firstname
    lastname = $lastname
    email = $email
    password = $password
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://0.0.0.0:5000/api/signup" -Method Post -Body $body -ContentType "application/json"
