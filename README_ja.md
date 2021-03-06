[ [English](README.md) ] [ 日本語 ]

# BBC micro:bit を使った Web Bluetooth 利用例

## メモ

+ Web Bluetooth API のサポートは Chrome (>= 56) または Opera (>= 43) に限定されているかもしれません。
+ 以下の内容は macOS 10.14 上で Chrome 77 および Bluetooth Explorer for Xcode 10.2 を使って検証しました。

## システム構成

### デバイス側

<table>
	<tr><td align="center">
Microsoft Makecode を使って
	<br>
Blocks/JavaScript で書かれたコード
	</td></tr>
	<tr><td align="center">
micro:bit runtime
	</td></tr>
	<tr><td align="center">
micro:bit device
	</td></tr>
	</table>

### ブラウザ側

<table>
	<tr><td align="center">
JavaScript で書かれたコード
	</td></tr>
	<tr><td align="center">
Web Bluetooth API
	</td></tr>
	<tr><td align="center">
Chrome (>= 56) or
	<br>
Opera (>= 43)
	</td></tr>
	</table>

## 準備

### デバイス側

1. PC で 任意の browser を起動する。
1. [Microsoft Makecode for micro:bit](https://makecode.microbit.org/) サイトを開く。
1. `新しいプロジェクト (New Project)` を作成。
1. 拡張機能 `Bluetooth` が表示されていない場合、`高度なブロック (Advanced)` → `拡張機能 (Extensions)` から追加する。`Bluetooth` を追加すると、同時に使用できない拡張機能 `無線 (Radio)` は削除される。
1. 編集モードを `ブロック (Blocks)` から `JavaScript` に変更し、次のコードで置き換える。

	```javascript
	bluetooth.onBluetoothConnected(function () {
	    basic.showIcon(IconNames.Yes)
	})
	bluetooth.onBluetoothDisconnected(function () {
	    basic.showIcon(IconNames.Square)
	})
	bluetooth.onUartDataReceived(serial.delimiters(Delimiters.NewLine), function () {
	    str = bluetooth.uartReadUntil(serial.delimiters(Delimiters.NewLine))
	    basic.showIcon(IconNames.Heart)
	    basic.pause(200)
	    basic.showIcon(IconNames.Yes)
	    bluetooth.uartWriteString("Received " + str + "\n")
	})
	let str = ""
	bluetooth.startButtonService()
	bluetooth.startLEDService()
	bluetooth.startUartService()
	basic.showIcon(IconNames.Square)
	```

1. `プロジェクトの設定 (Project Settings)` を開き、ペアリング方法を `JustWorks pairing (default)` から `No Pairing Required` に変更する。この設定は本実験に必須。
1. プロジェクトに名前 (`BLE` など) をつけて保存する。デバイスへの書き込み用の拡張子 `.hex` のファイル (`microbit-BLE.hex` など) が `ダウンロード` フォルダに自動的に保存される。
1. micro:bit デバイスを PC の USB ポートに接続し、`MICROBIT` の名前の USB ストレージがマウントされたことを確認する。
1. ダウンロードされた 拡張子 `.hex` のファイルを USB ストレージにコピーする。
1. Bluetooth 接続が可能になると、デバイスに 四角形 のアイコンが表示される。

### ブラウザ側

1. [本リポジトリ (`web-bluetooth-example-using-microbit`)](https://github.com/softgraph/web-bluetooth-example-using-microbit) をクローンする。

## 手順

1. Chrome または Opera を起動し、クローンしたリポジトリ内の `source/index.html` を開く。
1. デバイスに 四角形 のアイコンが表示されていることを確認する。チェックマークのアイコンが表示されている場合はデバイスをリセットする。
1. ブラウザの `Connect` ボタンを押す。ダイアログボックスのリストから `BBC micro:bit [.....]` の名前のデバイスを選択する。
1. 接続が成功すると、ブラウザの `Connection Status` フィールドに `Connected` が表示される。またデバイスにはチェックマークのアイコンが表示される。
1. デバイスで A または B ボタンを押す。状態の変化がデバイスから通知され、ブラウザの `Button Status` フィールドに表示される。

### ドキュメント

JavaScript 部分のドキュメントを生成するには、プロジェクトルートの `jsdoc.json` を使って次のように [JSDoc (github.com)](https://github.com/jsdoc/jsdoc) を実行してください。JSDoc 3 以上が必要です。

```Console
$ jsdoc -c jsdoc.json
$ open jsdoc/index.html
```

## 参照

### Bluetooth on micro:bit

+ [micro:bit Bluetooth profile overview (lancaster-university.github.io)](https://lancaster-university.github.io/microbit-docs/ble/profile/)
+ [micro:bit Bluetooth profile reference (lancaster-university.github.io)](https://lancaster-university.github.io/microbit-docs/resources/bluetooth/bluetooth_profile.html)
+ [MakeCode Bluetooth reference (makecode.microbit.org)](https://makecode.microbit.org/reference/bluetooth)

### Web Bluetooth

+ [Web Bluetooth API (mozilla.org)](https://developer.mozilla.org/en-US/docs/Web/API/Web_Bluetooth_API)
+ [Web Bluetooth Samples (googlechrome.github.io)](https://googlechrome.github.io/samples/web-bluetooth/)
+ [Web Bluetooth (webbluetoothcg.github.io)](https://webbluetoothcg.github.io/web-bluetooth/)

### JavaScript

+ [JavaScript (日本語) (mozilla.org)](https://developer.mozilla.org/ja/docs/Web/JavaScript)
+ [JavaScript (mozilla.org)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
+ [JavaScript Tutorial (w3schools.com)](https://www.w3schools.com/js/)

© 2019 Softgraph, Inc.
