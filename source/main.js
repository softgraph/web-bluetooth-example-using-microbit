
// ------------------------------------------------------------
//	Interface to the html
// ------------------------------------------------------------

//	<input type="text">
const kIdConnectionStatusText = 'id_input_text_connection_status';
const kIdButtonStatusText = 'id_input_text_button_status';

//	<textarea>
const kIdDeviceInformationText = 'id_textarea_device_information';

//	<button>
const kIdConnectButton = 'id_button_connect';
const kIdDisconnectButton = 'id_button_disconnect';
const kIdSayHelloButton = 'id_button_say_hello';

// ------------------------------------------------------------
//	Interface to micro:bit Bluetooth Profile
// ------------------------------------------------------------

/*
	See also:
	- micro:bit Bluetooth Profile
		https://lancaster-university.github.io/microbit-docs/ble/profile/
	- micro:bit Bluetooth profile specification
		https://lancaster-university.github.io/microbit-docs/resources/bluetooth/bluetooth_profile.html
*/

// ------------------------------------------------------------
//	Device Information
// ------------------------------------------------------------

/*
	Device Information
	- UUID:
		0000180A00001000800000805F9B34FB
	- Abstract:
		The Device Information Service exposes manufacturer and/or vendor information about a device.
	- Summary:
		This service exposes manufacturer information about a device.
		The Device Information Service is instantiated as a Primary Service.
		Only one instance of the Device Information Service is exposed on a device.
*/

const kDeviceInformation = '0000180a-0000-1000-8000-00805f9b34fb';

/*
	Model Number String
	- UUID:
		00002A2400001000800000805F9B34FB
	- Abstract:
		The value of this characteristic is a UTF-8 string representing the model number assigned by the device vendor. 
	- Fields:
		1. Model Number : utf8s
*/

const kModelNumberString = '00002a24-0000-1000-8000-00805f9b34fb';

/*
	Serial Number String
	- UUID:
		00002A2500001000800000805F9B34FB
	- Abstract:
		The value of this characteristic is a variable-length UTF-8 string representing the serial number for a particular instance of the device.
	- Fields:
		1. Serial Number : utf8s
*/

const kSerialNumberString = '00002a25-0000-1000-8000-00805f9b34fb';

/*
	Firmware Revision String
	- UUID:
		00002A2600001000800000805F9B34FB
	- Summary:
		The value of this characteristic is a UTF-8 string representing the firmware revision for the firmware within the device.
	- Fields:
		1. Firmware Revision : utf8s
*/

const kFirmwareRevisionString = '00002a26-0000-1000-8000-00805f9b34fb';

// ------------------------------------------------------------
//	Button Service
// ------------------------------------------------------------

/*
	Button Service
	- UUID:
		E95D9882251D470AA062FA1922DFA9A8
	- Summary:
		Exposes the two Micro Bit buttons and allows 'commands' associated with button state changes to be associated with button states and notified to a connected client.
*/

const kButtonService = 'e95d9882-251d-470a-a062-fa1922dfa9a8';

/*
	Button A State
	- UUID:
		E95DDA90251D470AA062FA1922DFA9A8
	- Summary:
		State of Button A may be read on demand by a connected client or the client may subscribe to notifications of state change.
		3 button states are defined and represented by a simple numeric enumeration:  0 = not pressed, 1 = pressed, 2 = long press.
	- Fields:
		1. Button_State_Value : uint8
*/

const kButtonAState = 'e95dda90-251d-470a-a062-fa1922dfa9a8';

/*
	Button B State
	- UUID:
		E95DDA91251D470AA062FA1922DFA9A8
	- Summary:
		State of Button B may be read on demand by a connected client or the client may subscribe to notifications of state change.
		3 button states are defined and represented by a simple numeric enumeration:  0 = not pressed, 1 = pressed, 2 = long press.
	Fields:
		1. Button_State_Value : uint8
*/

const kButtonBState = 'e95dda91-251d-470a-a062-fa1922dfa9a8';

// ------------------------------------------------------------
//	LED Service
// ------------------------------------------------------------

/*
	LED Service
	- UUID:
		E95DD91D251D470AA062FA1922DFA9A8
	- Summary:
		Provides access to and control of LED state. Allows the state (ON or OFF) of all 25 LEDs to be set in a single write operation. 
		Allows short text strings to be sent by a client for display on the LED matrix and scrolled across at a speed controlled by the Scrolling Delay characteristic.
*/

const kLedService = 'e95dd91d-251d-470a-a062-fa1922dfa9a8';

/*
	LED Matrix State
	- UUID:
		E95D7B77251D470AA062FA1922DFA9A8
	- Summary:
		Allows the state of any|all LEDs in the 5x5 grid to be set to on or off with a single GATT operation.
		Consists of an array of 5 x utf8 octets, each representing one row of 5 LEDs.
		Octet 0 represents the first row of LEDs i.e. the top row when the micro:bit is viewed with the edge connector at the bottom and USB connector at the top.
		Octet 1 represents the second row and so on.
		In each octet, bit 4 corresponds to the first LED in the row, bit 3 the second and so on. 
		Bit values represent the state of the related LED: off (0) or on (1).
		
		So we have:
		Octet 0, LED Row 1: bit4 bit3 bit2 bit1 bit0
		Octet 1, LED Row 2: bit4 bit3 bit2 bit1 bit0
		Octet 2, LED Row 3: bit4 bit3 bit2 bit1 bit0
		Octet 3, LED Row 4: bit4 bit3 bit2 bit1 bit0
		Octet 4, LED Row 5: bit4 bit3 bit2 bit1 bit0
	Fields:
		1. LED_Matrix_State : uint8[]
*/

const kLedMatrixState = 'e95d7b77-251d-470a-a062-fa1922dfa9a8';

/*
	LED Text
	- UUID:
		E95D93EE251D470AA062FA1922DFA9A8
	- Summary:
		A short UTF-8 string to be shown on the LED display. Maximum length 20 octets.
	Fields:
		1. LED_Text_Value : utf8s
*/

const kLedText = 'e95d93ee-251d-470a-a062-fa1922dfa9a8';

/*
	Scrolling Delay
	- UUID:
		E95D0D2D251D470AA062FA1922DFA9A8
	- Summary:
		Specifies a millisecond delay to wait for in between showing each character on the display.
	Fields:
		1. Scrolling_Delay_Value : uint16
*/

const kScrollingDelay = 'e95d0d2d-251d-470a-a062-fa1922dfa9a8';

// ------------------------------------------------------------

const kScrollingDelayInMilliseconds = 100;

var gDevice = null;
var gLedMatrixState = null;
var gLedText = null;

window.onload = onWindowLoad;

function onWindowLoad() {
	window.onbeforeunload = onWindowBeforeUnload;
	document.getElementById(kIdConnectButton).addEventListener(
		'click', onConnectButtonClick, false);
	document.getElementById(kIdDisconnectButton).addEventListener(
		'click', onDisconnectButtonClick, false);
	document.getElementById(kIdSayHelloButton).addEventListener(
		'click', onSayHelloButtonClick, false);
};

function onWindowBeforeUnload() {
	if(gDevice && gDevice.gatt.connected) {
		gDevice.gatt.disconnect();
	}
}

function onConnectButtonClick() {
	navigator.bluetooth.requestDevice({
		filters: [{
			namePrefix: 'BBC micro:bit'	// e.g., 'BBC micro:bit [vagip]'
		}],
		optionalServices: [
			kDeviceInformation,
			kButtonService,
			kLedService
		]
	}).then(device => {
		// device: Promise to BluetoothDevice
		gDevice = device;
		return device.gatt.connect();
	}).then(server => {
		// server: Promise to BluetoothRemoteGATTServer
		return Promise.all([
			server.getPrimaryService(kDeviceInformation),
			server.getPrimaryService(kButtonService),
			server.getPrimaryService(kLedService)
		]);
	}).then(services => {
		// services: Promise to [BluetoothGATTService]
		return Promise.all([
			services[0].getCharacteristic(kModelNumberString),
			//	services[0].getCharacteristic(kSerialNumberString),
			/*
				Note that the above call is failed with the following error.
				- SecurityError: getCharacteristic(s) called with blocklisted UUID. https://goo.gl/4NeimX
			*/
			services[0].getCharacteristic(kFirmwareRevisionString),
			services[1].getCharacteristic(kButtonAState),
			services[1].getCharacteristic(kButtonBState),
			services[2].getCharacteristic(kLedMatrixState),
			services[2].getCharacteristic(kLedText),
			services[2].getCharacteristic(kScrollingDelay)
		]);
	}).then(characteristics => {
		// characteristics: Promise to [BluetoothGATTCharacteristic]
		const decoder = new TextDecoder();
		var i = 0;
		characteristics[i++].readValue().then(data => {
			// data: Promise to DataView
			let deviceInfoText = document.getElementById(kIdDeviceInformationText);
			deviceInfoText.value = "Model Number: " + decoder.decode(data) + "\n";
		});
		/*
		characteristics[i++].readValue().then(data => {
			// data: Promise to DataView
			let deviceInfoText = document.getElementById(kIdDeviceInformationText);
			deviceInfoText.value += "Serial Number: " + decoder.decode(data) + "\n";
		});
		*/
		characteristics[i++].readValue().then(data => {
			// data: Promise to DataView
			let deviceInfoText = document.getElementById(kIdDeviceInformationText);
			deviceInfoText.value += "Firmware Revision: " + decoder.decode(data) + "\n";
		});
		characteristics[i++].startNotifications().then(characteristic => {
			// characteristic: Promise to BluetoothRemoteGATTCharacteristic
			characteristic.addEventListener(
				'characteristicvaluechanged', handleButtonAStateChanged);
		});
		characteristics[i++].startNotifications().then(characteristic => {
			// characteristic: Promise to BluetoothRemoteGATTCharacteristic
			characteristic.addEventListener(
				'characteristicvaluechanged', handleButtonBStateChanged);
		});
		gLedMatrixState = characteristics[i++];
		gLedText = characteristics[i++];

		/*
			The following `data` definitions are available except for (a)
			as a parameter for writeValue() to Scrolling_Delay_Value of uint16.
			Because `DataView` is a common interface for low-level data conversion,
			it seems only (a) is correct, but the result is not.
		*/

		/*
			- (a) DataView contains a uint16 value
		*
		var data = new DataView(new ArrayBuffer(2));
		data.setUint16(0, kScrollingDelayInMilliseconds);
		*/

		/*
			- (b) DataView contains a swapped uint16 value
		*
		var data = new DataView(new ArrayBuffer(2));
		data.setUint16(0,
			((kScrollingDelayInMilliseconds << 8) & 0xff00) +
			((kScrollingDelayInMilliseconds >> 8) & 0x00ff)
		);
		*/

		/*
			- (c) DataView contains a uint8 value
		*
		var data = new DataView(new ArrayBuffer(1));
		data.setUint8(0, kScrollingDelayInMilliseconds);
		*/

		/*
			- (d) Uint16Array with an element
		*/
		var data = Uint16Array.of(kScrollingDelayInMilliseconds);

		characteristics[i++].writeValue(data /* as ArrayBuffer */);

		let statusText = document.getElementById(kIdConnectionStatusText);
		statusText.value = 'Connected';
	}).catch(reason => {
		alert(reason);
	});
}

function onDisconnectButtonClick() {
	let statusText = document.getElementById(kIdConnectionStatusText);
	if(gDevice && gDevice.gatt.connected) {
		gDevice.gatt.disconnect();
		if(gDevice.gatt.connected) {
			statusText.value = 'Disconnection Failed';
		}
		else {
			statusText.value = 'Disconnected';
		}
	}
	else {
		statusText.value = 'Not Connected';
	}
	gDevice = null;
	gLedMatrixState = null;
	gLedText = null;
}

function onSayHelloButtonClick() {
	if(gLedText) {
		try {
			const encoder = new TextEncoder();
			gLedText.writeValue(encoder.encode('Hello'));
			setTimeout(showCheckmark, kScrollingDelayInMilliseconds * 6 * 6);
		}
		catch (reason) {
			alert(reason);
		}
	}
}

function showCheckmark() {
	if(gLedMatrixState) {
		try {
			/*
				The following `data` definitions are available as a parameter for
				writeValue() to LED_Matrix_State of uint8[].
				Because `DataView` is a common interface for low-level data conversion,
				it seems (a) is the most correct, but (b) is simpler and also valid for uint8 stream.
			*/

			/*
				- (a) DataView contains 5 uint8 values
			*
			var data = new DataView(new ArrayBuffer(5));
			data.setUint8(0, 0x00);
			data.setUint8(1, 0x01);
			data.setUint8(2, 0x02);
			data.setUint8(3, 0x14);
			data.setUint8(4, 0x08);
			*/

			/*
				- (b) Uint8Array with 5 elements
			*/
			var data = Uint8Array.of(0x00, 0x01, 0x02, 0x14, 0x08);

			gLedMatrixState.writeValue(data /* as ArrayBuffer */);
		}
		catch (reason) {
			alert(reason);
		}
	}
}

function handleButtonAStateChanged(event) {
	let statusText = document.getElementById(kIdButtonStatusText);
	let buttonState = event.target.value.getUint8(0);
	if(buttonState == 1) {
		statusText.value = 'Button A Pressed';
	}
	else if(buttonState == 2) {
		statusText.value = 'Button A Long Pressed';
	}
	else {
		statusText.value = '';
	}
}

function handleButtonBStateChanged(event) {
	let statusText = document.getElementById(kIdButtonStatusText);
	let buttonState = event.target.value.getUint8(0);
	if(buttonState == 1) {
		statusText.value = 'Button B Pressed';
	}
	else if(buttonState == 2) {
		statusText.value = 'Button B Long Pressed';
	}
	else {
		statusText.value = '';
	}
}
