# HonoX sample

### 使っているもの

- HonoX
- Prisma

### やっていること

- Docker環境作る
- ページ作る
- API作る
- バリデーションする
- バリデーション結果に応じてエラーメッセージ出す
- クライアントからAPI叩く
- DB接続してデータ取得・登録・更新する

## セットアップ

開発環境立ち上げ

```console
make compose/up
```

DB初期化

```console
make db/reset
```

アクセス

http://localhost:5173

### その他

Docker環境再構築

```console
make compose/build
```

開発環境に入る

```console
make ssh/app
```

DBに入る

```console
make db/console
```
