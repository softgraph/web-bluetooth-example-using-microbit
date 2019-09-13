[ English ] [ [日本語](README_ja.md) ]

# Web Bluetooth example using BBC micro:bit

## N.B.

+ The support for Web Bluetooth API may be limited to Chrome (>= 56) or Opera (>= 43).
+ The following contents are verified on macOS 10.14 using Chrome 74 and Bluetooth Explorer for Xcode 10.2.

## System Structure

### Device Side

<table>
<tr>
<td align="center">
	Your code written in Blocks/JavaScript <br>
	using Microsoft Makecode
	</td>
	</tr>
<tr>
<td align="center">
	micro:bit runtime
	</td>
	</tr>
<tr>
<td align="center">
	micro:bit device
	</td>
	</tr>
	</table>

### Browser Side

<table>
<tr>
<td align="center">
	Your code written in JavaScript
	</td>
	</tr>
<tr>
<td align="center">
	Web Bluetooth API
	</td>
	</tr>
<tr>
<td align="center">
	Chrome (>= 56) or <br>
	Opera (>= 43)
	</td>
	</tr>
	</table>

## Preparation

### Device Side

1. Launch any browser on your PC.
1. Open [Microsoft Makecode for micro:bit](https://makecode.microbit.org/) site.
1. Create a `New Project`.
1. Add extension `Bluetooth` from `Advanced` -> `Extensions` if it is not listed. Note that extension `Radio` will be removed if you add `Bluetooth`.
1. Switch editor mode from `Blocks` to `JavaScript` and replace the existing code with the following.

		bluetooth.onBluetoothConnected(function () {
			basic.showIcon(IconNames.Yes)
		})
		bluetooth.onBluetoothDisconnected(function () {
			basic.showIcon(IconNames.Square)
		})
		bluetooth.startButtonService()
		bluetooth.startLEDService()
		basic.showIcon(IconNames.Square)

1. Open `Project Settings` and change paring method from `JustWorks pairing (default)` to `No Pairing Required`. This setting is required for this experiment.
1. Name the project (e.g., `BLE`) and save it. The `.hex` file (e.g. `microbit-BLE.hex`) for flashing to the device is automatically saved to your `Downloads` folder.
1. Connect your micro:bit device to a USB port on your PC and make sure that the usb storage named `MICROBIT` is mounted.
1. Copy the downloaded `.hex` file to the usb storage.
1. The device shows a square icon if it's ready for a Bluetooth connection.

### Browser Side

1. Clone [the repositry (`web-bluetooth-example-using-microbit`)](https://github.com/softgraph/web-bluetooth-example-using-microbit).

## Operations

1. Launch Chrome or Opera and open `source/index.html` in the cloned repositry.
1. Make sure that the device shows a square icon. Reset the device if it shows a yes (checkmark) icon.
1. Press `Connect` button on the browser. Choose a device named `BBC micro:bit [.....]` from the list on the dialog box.
1. When connection is established, `Connection Status` field on the browser shows `Connected`. Also, the device shows a yes (checkmark) icon.
1. Press button A or B on the device. State changes are reported from the device and shown on `Button Status` field on the browser.

## References

### Bluetooth on micro:bit

+ [micro:bit Bluetooth profile overview (lancaster-university.github.io)](https://lancaster-university.github.io/microbit-docs/ble/profile/)
+ [micro:bit Bluetooth profile reference (lancaster-university.github.io)](https://lancaster-university.github.io/microbit-docs/resources/bluetooth/bluetooth_profile.html)
+ [MakeCode Bluetooth reference (makecode.microbit.org)](https://makecode.microbit.org/reference/bluetooth)

### Web Bluetooth

+ [Web Bluetooth API (mozilla.org)](https://developer.mozilla.org/en-US/docs/Web/API/Web_Bluetooth_API)
+ [Web Bluetooth Samples (googlechrome.github.io)](https://googlechrome.github.io/samples/web-bluetooth/)
+ [Web Bluetooth (webbluetoothcg.github.io)](https://webbluetoothcg.github.io/web-bluetooth/)

### JavaScript

+ [JavaScript Tutorial (w3schools.com)](https://www.w3schools.com/js/)
