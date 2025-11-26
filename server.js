import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 8080;

// index.html以外を静的ファイルとして配信
app.use(express.static(path.join(__dirname, 'dist'), { index: false }));

// すべてのリクエストに対してindex.htmlを処理して返す
app.get('*', (req, res) => {
  const indexPath = path.join(__dirname, 'dist', 'index.html');
  
  fs.readFile(indexPath, 'utf8', (err, htmlData) => {
    if (err) {
      console.error('Error reading index.html', err);
      return res.status(500).send('Internal Server Error');
    }
    
    // サーバーの環境変数からAPIキーを取得し、HTML内のプレースホルダーを置換
    // これにより、クライアントサイド(React)でも process.env.API_KEY が使えるようになる
    const apiKey = process.env.API_KEY || '';
    const injectedHtml = htmlData.replace('__VITE_API_KEY_PLACEHOLDER__', apiKey);
    
    res.send(injectedHtml);
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});