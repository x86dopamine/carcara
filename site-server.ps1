$ErrorActionPreference = 'Stop'
$root = [IO.Path]::GetFullPath($PSScriptRoot)
$rootPrefix = $root.TrimEnd([IO.Path]::DirectorySeparatorChar) + [IO.Path]::DirectorySeparatorChar
$listener = [Net.Sockets.TcpListener]::new([Net.IPAddress]::Loopback, 4177)
$listener.Start()
Write-Host 'Carcará Lux disponível em http://127.0.0.1:4177/'
Write-Host 'Deixe esta janela aberta enquanto usa o site. Pressione Ctrl+C para encerrar.'
Start-Process 'http://127.0.0.1:4177/index.html'
try {
  while ($true) {
    $client = $listener.AcceptTcpClient()
    try {
      $client.ReceiveTimeout = 5000
      $stream = $client.GetStream()
      $reader = [IO.StreamReader]::new($stream, [Text.Encoding]::ASCII, $false, 1024, $true)
      $requestLine = $reader.ReadLine()
      while ($true) { $line = $reader.ReadLine(); if ([string]::IsNullOrEmpty($line)) { break } }
      $parts = @()
      if ($requestLine) { $parts = $requestLine.Split(' ') }
      $method = if ($parts.Length -gt 0) { $parts[0] } else { '' }
      $status = '200 OK'
      $contentType = 'application/octet-stream'
      $body = [byte[]]@()
      if ($method -ne 'GET' -and $method -ne 'HEAD') {
        $status = '405 Method Not Allowed'; $contentType = 'text/plain; charset=utf-8'; $body = [Text.Encoding]::UTF8.GetBytes('Method not allowed')
      } elseif ($parts.Length -lt 2) {
        $status = '400 Bad Request'; $contentType = 'text/plain; charset=utf-8'; $body = [Text.Encoding]::UTF8.GetBytes('Bad request')
      } else {
        $target = [Uri]::new('http://127.0.0.1:4177' + $parts[1])
        $relativePath = [Uri]::UnescapeDataString($target.AbsolutePath.TrimStart('/').Replace('/', [IO.Path]::DirectorySeparatorChar))
        if ([string]::IsNullOrWhiteSpace($relativePath)) { $relativePath = 'index.html' }
        $filePath = [IO.Path]::GetFullPath((Join-Path $root $relativePath))
        if (-not $filePath.StartsWith($rootPrefix, [StringComparison]::OrdinalIgnoreCase) -or -not [IO.File]::Exists($filePath)) {
          $status = '404 Not Found'; $contentType = 'text/plain; charset=utf-8'; $body = [Text.Encoding]::UTF8.GetBytes('Not found')
        } else {
          $extension = [IO.Path]::GetExtension($filePath).ToLowerInvariant()
          $contentType = switch ($extension) {
            '.html' { 'text/html; charset=utf-8' }; '.css' { 'text/css; charset=utf-8' }; '.js' { 'text/javascript; charset=utf-8' }
            '.svg' { 'image/svg+xml' }; '.jpg' { 'image/jpeg' }; '.jpeg' { 'image/jpeg' }; '.png' { 'image/png' }
            '.webp' { 'image/webp' }; '.gif' { 'image/gif' }; '.ico' { 'image/x-icon' }
            '.woff' { 'font/woff' }; '.woff2' { 'font/woff2' }; '.ttf' { 'font/ttf' }; '.otf' { 'font/otf' }
            '.glb' { 'model/gltf-binary' }; '.json' { 'application/json' }; '.mp4' { 'video/mp4' }
            default { 'application/octet-stream' }
          }
          $body = [IO.File]::ReadAllBytes($filePath)
        }
      }
      $length = $body.Length
      if ($method -eq 'HEAD') { $body = [byte[]]@() }
      $header = 'HTTP/1.1 ' + $status + [char]13 + [char]10 + 'Content-Type: ' + $contentType + [char]13 + [char]10 +
        'Content-Length: ' + $length + [char]13 + [char]10 + 'X-Content-Type-Options: nosniff' + [char]13 + [char]10 +
        'Connection: close' + [char]13 + [char]10 + [char]13 + [char]10
      $headerBytes = [Text.Encoding]::ASCII.GetBytes($header)
      $stream.Write($headerBytes, 0, $headerBytes.Length)
      if ($method -eq 'GET' -and $body.Length -gt 0) { $stream.Write($body, 0, $body.Length) }
      $stream.Flush()
    } catch { Write-Warning $_.Exception.Message }
    finally { if ($client) { $client.Close() } }
  }
} finally { $listener.Stop() }