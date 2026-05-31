# Запустите этот скрипт, если нужно обновить фото/видео с Downloads:
# powershell -ExecutionPolicy Bypass -File copy-media.ps1

$destImg = "$PSScriptRoot\assets\images"
$destVid = "$PSScriptRoot\assets\video"
New-Item -ItemType Directory -Force -Path $destImg, $destVid | Out-Null

Get-ChildItem "D:\Downloads\*.mp4" | Where-Object {
  $_.Name -like "*габион*" -or $_.Name -like "*Габион*" -or $_.Name -like "*Забор*" -or $_.Name -like "*Скамейка*"
} | ForEach-Object -Begin { $i = 0 } -Process {
  $names = @("style.mp4", "fence-astana.mp4", "bench-altai.mp4")
  if ($i -lt $names.Count) {
    Copy-Item -LiteralPath $_.FullName "$destVid\$($names[$i])" -Force
    Write-Host "Video: $($names[$i])"
    $i++
  }
}

if (Test-Path "D:\Downloads\tasgabion.png") {
  Copy-Item "D:\Downloads\tasgabion.png" "$destImg\logo.png" -Force
  Write-Host "Logo updated"
}

Write-Host "Done."
