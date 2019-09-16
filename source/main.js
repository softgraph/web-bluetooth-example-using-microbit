/* eslint-env browser, es6 */
/*
	see also:
	https://eslint.org/docs/user-guide/configuring#specifying-environments
*/

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

//  const kSerialNumberString = '00002a25-0000-1000-8000-00805f9b34fb';

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
//	UART Service
// ------------------------------------------------------------

/*
	UART Service
	- UUID:
		6E400001B5A3F393E0A9E50E24DCCA9E
	- Summary:
		This is an implementation of Nordic Semicondutor's UART/Serial Port Emulation over Bluetooth low energy.
		See https://developer.nordicsemi.com/nRF5_SDK/nRF51_SDK_v8.x.x/doc/8.0.0/s110/html/a00072.html for the original Nordic Semiconductor documentation by way of background.
*/

const kUartService = '6e400001-b5a3-f393-e0a9-e50e24dcca9e';


/*
	TX Characteristic
	- UUID:
		6E400002B5A3F393E0A9E50E24DCCA9E
	- Summary:
		This characteristic allows the micro:bit to transmit a byte array containing an arbitrary number of arbitrary octet values to a connected device.
		The maximum number of bytes which may be transmitted in one PDU is limited to the MTU minus three or 20 octets to be precise.
		Specifies a millisecond delay to wait for in between showing each character on the display.
	Fields:
		1. UART TX Field : uint8[]
*/

const kTxCharacteristic = '6e400002-b5a3-f393-e0a9-e50e24dcca9e';

/*
	RX Characteristic
	- UUID:
		6E400003B5A3F393E0A9E50E24DCCA9E
	- Summary:
		This characteristic allows a connected client to send a byte array containing an arbitrary number of arbitrary octet values to a connected micro:bit.
		The maximum number of bytes which may be transmitted in one PDU is limited to the MTU minus three or 20 octets to be precise.
		Specifies a millisecond delay to wait for in between showing each character on the display.
	Fields:
		1. UART TX Field : uint8[]
*/

const kRxCharacteristic = '6e400003-b5a3-f393-e0a9-e50e24dcca9e';

// ------------------------------------------------------------
//	HTML Framework
// ------------------------------------------------------------

/**
	A `TextArea` obejct represents a html element of `<input type="text">` or `<textarea>`.
*/
class TextArea {
	constructor(id) {
		this.id = id;			// id: String
		this.target = null;		// target: Element
	}
	set text(newValue) {
		if(!this.target) {
			this.target = document.getElementById(this.id);
		}
		this.target.value = newValue;
	}
	get text() {
		if(!this.target) {
			this.target = document.getElementById(this.id);
		}
		return this.target.value;
	}
}

/**
	A `Button` obejct represents a html element of `<button>. The object can handle events of type `click`.
*/
class Button {
	constructor(id) {
		this.id = id;			// id: String
		this.target = null;		// target: Element
	}
	addClickEventListener(listener) {	// listener: function( Event )
		if(!this.target) {
			this.target = document.getElementById(this.id);
		}
		this.target.addEventListener('click', listener, false);
	}
}

// ------------------------------------------------------------
//	Bluetooth Framework
// ------------------------------------------------------------

/**
	A `BtServer` obejct represents a GATT server on a remote Bluetooth device.
*/
class BtServer {
	constructor(bluetoothDevice, bluetoothServer, serviceUuidList) {
		this.device = bluetoothDevice;		// device: BluetoothDevice
		this.target = bluetoothServer;		// target: BluetoothRemoteGATTServer
		this.uuidList = serviceUuidList;	// uuidList: [ UUID ]
		this.btServices = new Map();		// btServices: { UUID, BtService }
		this.btCharacteristics = new Map();	// btCharacteristics: { UUID, BtCharacteristic }
	}
	getPrimaryServices() {
		return this.uuidList.map(x => this.target.getPrimaryService(x));
	}
	getCharacteristics() {
		return this.uuidList.flatMap(x => this.btServices.get(x).getCharacteristics());
	}
	registerBtService(uuid, btService) {
		this.btServices.set(uuid, btService);
	}
	getBtService(uuid) {
		return this.btServices.get(uuid);
	}
	registerBtCharacteristic(uuid, btCharacteristic) {
		this.btCharacteristics.set(uuid, btCharacteristic);
	}
	getBtCharacteristic(uuid) {
		return this.btCharacteristics.get(uuid);
	}
}

/**
	A `BtService` obejct represents a GATT service on a remote Bluetooth device.
*/
class BtService {
	static registerServices(btServer, bluetoothServices, characteristicUuidLists) {
		let i = 0;
		let bluetoothService;
		for (bluetoothService of bluetoothServices) {
			// create an object and register it to the btServer.
			new BtService(btServer, bluetoothService, characteristicUuidLists[i++]);
		}
	}
	constructor(btServer, bluetoothService, characteristicUuidList) {
		this.btServer = btServer;				// btServer: BtServer
		this.target = bluetoothService;			// target: BluetoothGATTService
		this.uuidList = characteristicUuidList;	// uuidList: [ UUID ]
		this.init();
	}
	init() {
		this.btServer.registerBtService(this.target.uuid, this);
	}
	getCharacteristics() {
		return this.uuidList.map(x => this.target.getCharacteristic(x));
	}
}

/**
	A `BtCharacteristic` obejct represents a GATT characteristic on a remote Bluetooth device.
*/
class BtCharacteristic {
	static registerCharacteristics(btServer, bluetoothCharacteristics) {	// bluetoothCharacteristics: [ BluetoothGATTCharacteristic ]
		let bluetoothCharacteristic;
		for (bluetoothCharacteristic of bluetoothCharacteristics) {
			// create an object and register it to the btServer.
			new BtCharacteristic(btServer, bluetoothCharacteristic);
		}
	}
	constructor(btServer, bluetoothCharacteristic) {
		this.btServer = btServer;				// btServer: BtServer
		this.target = bluetoothCharacteristic;	// target: BluetoothGATTCharacteristic
		this.receiver = null;					// receiver: function( ArrayBuffer ) or function( String )
		this.init();
	}
	init() {
		this.btServer.registerBtCharacteristic(this.target.uuid, this);
	}
	addValueChangedEventListener(listener) {	// listener: function( Event )
		this.target.startNotifications().then(characteristic => {	// BluetoothRemoteGATTCharacteristic
			characteristic.addEventListener('characteristicvaluechanged', listener);
		});
	}
	readData() {
		this.target.readValue().then(data => {	// data: ArrayBuffer
			this.receiver(data);
		}).catch(reason => {
			alert(reason);
		});
	}
	readText() {
		this.target.readValue().then(data => {	// data: ArrayBuffer
			const decoder = new TextDecoder();
			const text = decoder.decode(data);
			this.receiver(text);
		}).catch(reason => {
			alert(reason);
		});
	}
	writeData(data) {	// data: ArrayBuffer
		this.target.writeValue(data);
	}
	writeText(text) {	// text: String
		let length = text.length;
		if(length > 0) {
			const encoder = new TextEncoder();
			this.target.writeValue(encoder.encode(text));
		}
	}
}

// ------------------------------------------------------------
//	Interface to the html
// ------------------------------------------------------------

//	Button objects

let gConnectButton		= new Button('id_button_connect');
let gDisconnectButton	= new Button('id_button_disconnect');
let gShowMessageButton	= new Button('id_button_show_message');
let gSendRequestButton	= new Button('id_button_send_request');

//	TextArea objects

let gConnectionStatusTextArea	= new TextArea('id_input_text_connection_status');
let gModelNumberTextArea		= new TextArea('id_input_text_model_number');
let gFirmwareRevisionTextArea	= new TextArea('id_input_text_firmware_revision');
let gButtonStatusTextArea		= new TextArea('id_input_text_button_status');
let gMessageTextArea			= new TextArea('id_input_text_message');
let gRequesTextArea				= new TextArea('id_input_text_request');
let gResponseTextArea			= new TextArea('id_input_text_response');

// ------------------------------------------------------------
//	Interface to the Bluetooth device
// ------------------------------------------------------------

/**
	The global `BluetoothDevice` obejct for the connected Bluetooth device.
*/
let gDevice = null;

/**
	The global `BtServer` obejct for the connected Bluetooth device.
*/
let gBtServer = null;

/**
	Bluetooth device filter.
*/
const sBtDeviceFilter = {
	namePrefix: 'BBC micro:bit'	// e.g., 'BBC micro:bit [vagip]'
};

/**
	Bluetooth service uuid list.
*/
const sBtServiceUuidList = [
	kDeviceInformation,
	kUartService,
	kButtonService,
	kLedService
];

/**
	Bluetooth characteristic uuid list.
	
	Note that `kSerialNumberString` is blocked with the following error.
	- SecurityError: getCharacteristic(s) called with blocklisted UUID.
	See also
	- https://goo.gl/4NeimX
*/
const sBtCharacteristicUuidList = [
	[
		kModelNumberString,
	//	kSerialNumberString,
		kFirmwareRevisionString
	],
	[
		kTxCharacteristic,
		kRxCharacteristic
	],
	[
		kButtonAState,
		kButtonBState
	],
	[
		kLedMatrixState,
		kLedText,
		kScrollingDelay
	]
];

// ------------------------------------------------------------

const kScrollingDelayInMilliseconds = 100;	// 100;

// ------------------------------------------------------------
//	Window events
// ------------------------------------------------------------

window.onload = onWindowLoad;

function onWindowLoad() {
	window.onbeforeunload = onWindowBeforeUnload;

	gConnectButton.addClickEventListener(onConnectButtonClick);
	gDisconnectButton.addClickEventListener(onDisconnectButtonClick);
	gShowMessageButton.addClickEventListener(onShowMessageButtonClick);
	gSendRequestButton.addClickEventListener(onSendRequestButtonClick);
}

function onWindowBeforeUnload() {
	if(gDevice && gDevice.gatt.connected) {
		gDevice.gatt.disconnect();
	}
}

// ------------------------------------------------------------
//	Bluetooth connection
// ------------------------------------------------------------

function onConnectButtonClick() {
	if (!navigator.bluetooth) {
		alert(`Web Bluetooth is not available on this browser.`);
		return;
	}
	gConnectionStatusTextArea.text = 'Connecting...';
	navigator.bluetooth.requestDevice({
		filters: [sBtDeviceFilter],
		optionalServices: sBtServiceUuidList
	}).then(device => {		// device: BluetoothDevice
		gDevice = device;
		return device.gatt.connect();
	}).then(server => {		// server: BluetoothRemoteGATTServer
		gBtServer = new BtServer(gDevice, server, sBtServiceUuidList);
		return Promise.all(gBtServer.getPrimaryServices());
	}).then(services => {	// services: [ BluetoothGATTService ]
		BtService.registerServices(gBtServer, services, sBtCharacteristicUuidList);
		return Promise.all(gBtServer.getCharacteristics());
	}).then(characteristics => {	// characteristics: [ BluetoothGATTCharacteristic ]
		BtCharacteristic.registerCharacteristics(gBtServer, characteristics);
		handleConnected();
		gConnectionStatusTextArea.text = 'Connected';
	}).catch(reason => {
		alert(reason);
	});
}

function handleConnected() {
	retrieveDeviceInformation();
	setScrollingDelay();
	observeButtons();
	observeUart();
}

function onDisconnectButtonClick() {
	if(gDevice && gDevice.gatt.connected) {
		gDevice.gatt.disconnect();
		if(gDevice.gatt.connected) {
			gConnectionStatusTextArea.text = 'Disconnection Failed';
		}
		else {
			gConnectionStatusTextArea.text = 'Disconnected';
		}
	}
	else {
		gConnectionStatusTextArea.text = 'Not Connected';
	}
	gDevice = null;
}

// ------------------------------------------------------------
//	Device Information
// ------------------------------------------------------------

function retrieveDeviceInformation() {
	let btCharacteristic = gBtServer.getBtCharacteristic(kModelNumberString);
	if(btCharacteristic) {
		btCharacteristic.receiver = function (text) {
			gModelNumberTextArea.text = text;
		};
		btCharacteristic.readText();
	}
	btCharacteristic = gBtServer.getBtCharacteristic(kFirmwareRevisionString);
	if(btCharacteristic) {
		btCharacteristic.receiver = function (text) {
			gFirmwareRevisionTextArea.text = text;
		};
		btCharacteristic.readText();
	}
}

// ------------------------------------------------------------
//	Button Service
// ------------------------------------------------------------

function observeButtons()
{
	let btCharacteristic;
	btCharacteristic = gBtServer.getBtCharacteristic(kButtonAState);
	if(btCharacteristic) {
		btCharacteristic.addValueChangedEventListener(handleButtonAStateChanged);
	}
	btCharacteristic = gBtServer.getBtCharacteristic(kButtonBState);
	if(btCharacteristic) {
		btCharacteristic.addValueChangedEventListener(handleButtonBStateChanged);
	}
}

function handleButtonAStateChanged(event) {
	let value = event.target.value.getUint8(0);
	if(value == 1) {
		gButtonStatusTextArea.text = 'Button A Pressed';
	}
	else if(value == 2) {
		gButtonStatusTextArea.text = 'Button A Long Pressed';
	}
	else {
		gButtonStatusTextArea.text = '';
	}
}

function handleButtonBStateChanged(event) {
	let value = event.target.value.getUint8(0);
	if(value == 1) {
		gButtonStatusTextArea.text = 'Button B Pressed';
	}
	else if(value == 2) {
		gButtonStatusTextArea.text = 'Button B Long Pressed';
	}
	else {
		gButtonStatusTextArea.text = '';
	}
}

// ------------------------------------------------------------
//	LED Service
// ------------------------------------------------------------

function setScrollingDelay() {
	const btCharacteristic = gBtServer.getBtCharacteristic(kScrollingDelay);
	if(!btCharacteristic) {
		return;
	}
	//	use platform's endianness as
	//		let data = Uint16Array.of(kScrollingDelayInMilliseconds);
	//	or use little endian explicitly
	let data = new DataView(new ArrayBuffer(2));
	data.setUint16(0, kScrollingDelayInMilliseconds, true);
	btCharacteristic.writeData(data);
}

function onShowMessageButtonClick() {
	const btCharacteristic = gBtServer.getBtCharacteristic(kLedText);
	if(!btCharacteristic) {
		return;
	}
	try {
		const text = gMessageTextArea.text;
		const length = text.length;
		if(length > 0) {
			btCharacteristic.writeText(text);
			setTimeout(showCheckmark, kScrollingDelayInMilliseconds * 6 * (length + 2));
		}
	}
	catch (reason) {
		alert(reason);
	}
}

function showCheckmark() {
	const btCharacteristic = gBtServer.getBtCharacteristic(kLedMatrixState);
	if(!btCharacteristic) {
		return;
	}
	try {
		let data = Uint8Array.of(
			0x00,	//	- - - - -
			0x01,	//	- - - - X
			0x02,	//	- - - X -
			0x14,	//	X - X - -
			0x08	//	- X - - -
		);
		btCharacteristic.writeData(data);
	}
	catch (reason) {
		alert(reason);
	}
}

// ------------------------------------------------------------
//	UART Seervice
// ------------------------------------------------------------

function onSendRequestButtonClick() {
	const txCharacteristic = gBtServer.getBtCharacteristic(kRxCharacteristic);
	if(txCharacteristic) {
		try {
			/*
			let data = Uint8Array.of(0x4a, 0x42, 0x3A);
			txCharacteristic.writeData(data);
			*/
			let text = gRequesTextArea.text;
			const length = text.length;
			if(length > 0) {
				text += '\n';
				txCharacteristic.writeText(text);
			}
		}
		catch (reason) {
			alert(reason);
		}
	}
}

function observeUart()
{
	let btCharacteristic = gBtServer.getBtCharacteristic(kTxCharacteristic);
	if(btCharacteristic) {
		btCharacteristic.addValueChangedEventListener(handleTxCharacteristicChanged);
	}
}

function handleTxCharacteristicChanged(event) {
	const data = event.target.value;
	const decoder = new TextDecoder();
	const text = decoder.decode(data);
	gResponseTextArea.text = text;
}

// ------------------------------------------------------------
