Param()

$base = 'http://localhost:3333'
$cookie = New-TemporaryFile

Write-Host 'Signing up test user...'
Invoke-RestMethod -Uri "$base/auth/signup" -Method Post -ContentType 'application/json' -Body (@{name='Test';email='test+auth@example.com';password='secret'} | ConvertTo-Json) -WebSession (New-Object Microsoft.PowerShell.Commands.WebRequestSession)

Write-Host 'Check session (manual cookie may be required)'
Invoke-RestMethod -Uri "$base/auth/me" -Method Get

Write-Host 'Done.'
