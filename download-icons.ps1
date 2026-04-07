$dir = "public/assets/icons"
$urls = @{
    "html5.svg" = "https://www.vectorlogo.zone/logos/w3_html5/w3_html5-icon.svg"
    "css3.svg" = "https://www.vectorlogo.zone/logos/w3_css/w3_css-icon.svg"
    "tailwindcss.svg" = "https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg"
    "javascript.svg" = "https://www.vectorlogo.zone/logos/javascript/javascript-icon.svg"
    "typescript.svg" = "https://www.vectorlogo.zone/logos/typescriptlang/typescriptlang-icon.svg"
    "react.svg" = "https://www.vectorlogo.zone/logos/reactjs/reactjs-icon.svg"
    "nextjs.svg" = "https://www.vectorlogo.zone/logos/nextjs/nextjs-icon.svg"
    "java.svg" = "https://www.vectorlogo.zone/logos/java/java-icon.svg"
    "spring.svg" = "https://www.vectorlogo.zone/logos/springio/springio-icon.svg"
    "nodejs.svg" = "https://www.vectorlogo.zone/logos/nodejs/nodejs-icon.svg"
    "expressjs.svg" = "https://www.vectorlogo.zone/logos/expressjs/expressjs-icon.svg"
    "mongodb.svg" = "https://www.vectorlogo.zone/logos/mongodb/mongodb-icon.svg"
    "figma.svg" = "https://www.vectorlogo.zone/logos/figma/figma-icon.svg"
}

foreach ($name in $urls.Keys) {
    $outPath = Join-Path $dir $name
    Write-Host "Downloading $name..."
    Invoke-WebRequest -Uri $urls[$name] -OutFile $outPath -UseBasicParsing
}
Write-Host "All done!"
