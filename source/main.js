/* eslint-env browser, es6 */
/*
	@see
		https://eslint.org/docs/user-guide/configuring#specifying-environments
*/

// ------------------------------------------------------------
//	file
// ------------------------------------------------------------

/**	@file
		Main implementation on the browser side for the Web Bluetooth example using BBC micro:bit.
		The Bluetooth communication used in this example is defined by micro:bit Bluetooth Profile.
	@author
		Copyright (c) 2019 Tomoyuki Nakashima.
	@license
		This code is licensed under MIT license.
		See `LICENSE` in the project root for more information.
	@see
		Refer to the following links for the details of micro:bit Bluetooth Profile.
		<br>
		- {@link https://lancaster-university.github.io/microbit-docs/ble/profile/
			micro:bit Bluetooth Profile (lancaster-university.github.io)}
		<br>
		- {@link https://lancaster-university.github.io/microbit-docs/resources/bluetooth/bluetooth_profile.html
			micro:bit Bluetooth profile specification (lancaster-university.github.io)}
*/

// ------------------------------------------------------------
//	micro:bit Bluetooth Profile
// ------------------------------------------------------------

/**
	micro:bit Bluetooth Profile
	@namespace	MicroBit
*/
const MicroBit = {
	/**
		micro:bit Bluetooth Device Information service
		@namespace	DeviceInformation
		@memberof	MicroBit
	*/
	DeviceInformation: {
		/**
			Device Information service UUID
			<br><br>
			<b>[UUID]</b><br>
				0000180A00001000800000805F9B34FB
			<br><br>
			<b>[Abstract]</b><br>
				The Device Information Service exposes manufacturer and/or vendor information about a device.
			<br><br>
			<b>[Summary]</b><br>
				This service exposes manufacturer information about a device.
				The Device Information Service is instantiated as a Primary Service.
				Only one instance of the Device Information Service is exposed on a device.
		*/
		kService: '0000180a-0000-1000-8000-00805f9b34fb',

		/**
			Model Number String characteristic UUID
			<br><br>
			<b>[UUID]</b><br>
				00002A2400001000800000805F9B34FB
			<br><br>
			<b>[Abstract]</b><br>
				The value of this characteristic is a UTF-8 string representing the model number assigned by the device vendor. 
			<br><br>
			<b>[Fields]</b><br>
				1. Model Number : utf8s
		*/
		kModelNumberString: '00002a24-0000-1000-8000-00805f9b34fb',

		/*
			Serial Number String characteristic UUID
			<br><br>
			<b>[UUID]</b><br>
				00002A2500001000800000805F9B34FB
			<br><br>
			<b>[Abstract]</b><br>
				The value of this characteristic is a variable-length UTF-8 string representing the serial number for a particular instance of the device.
			<br><br>
			<b>[Fields]</b><br>
				1. Serial Number : utf8s
		*/
		//	kSerialNumberString: '00002a25-0000-1000-8000-00805f9b34fb',

		/**
			Firmware Revision String characteristic UUID
			<br><br>
			<b>[UUID]</b><br>
				00002A2600001000800000805F9B34FB
			<br><br>
			<b>[Summary]</b><br>
				The value of this characteristic is a UTF-8 string representing the firmware revision for the firmware within the device.
			<br><br>
			<b>[Fields]</b><br>
				1. Firmware Revision : utf8s
		*/
		kFirmwareRevisionString: '00002a26-0000-1000-8000-00805f9b34fb',
	},

	/**
		micro:bit Bluetooth Button Service
		@namespace	ButtonService
		@memberof	MicroBit
	*/
	ButtonService: {
		/**
			Button Service UUID
			<br><br>
			<b>[UUID]</b><br>
				E95D9882251D470AA062FA1922DFA9A8
			<br><br>
			<b>[Summary]</b><br>
				Exposes the two Micro Bit buttons and allows 'commands' associated with button state changes to be associated with button states and notified to a connected client.
		*/
		kService: 'e95d9882-251d-470a-a062-fa1922dfa9a8',

		/**
			Button A State characteristic UUID
			<br><br>
			<b>[UUID]</b><br>
				E95DDA90251D470AA062FA1922DFA9A8
			<br><br>
			<b>[Summary]</b><br>
				State of Button A may be read on demand by a connected client or the client may subscribe to notifications of state change.
				3 button states are defined and represented by a simple numeric enumeration:  0 = not pressed, 1 = pressed, 2 = long press.
			<br><br>
			<b>[Fields]</b><br>
				1. Button_State_Value : uint8
		*/
		kButtonAState: 'e95dda90-251d-470a-a062-fa1922dfa9a8',

		/**
			Button B State characteristic UUID
			<br><br>
			<b>[UUID]</b><br>
				E95DDA91251D470AA062FA1922DFA9A8
			<br><br>
			<b>[Summary]</b><br>
				State of Button B may be read on demand by a connected client or the client may subscribe to notifications of state change.
				3 button states are defined and represented by a simple numeric enumeration:  0 = not pressed, 1 = pressed, 2 = long press.
			<br><br>
			<b>[Fields]</b><br>
				1. Button_State_Value : uint8
		*/
		kButtonBState: 'e95dda91-251d-470a-a062-fa1922dfa9a8'
	},

	/**
		micro:bit Bluetooth LED Service
		@namespace	LedService
		@memberof	MicroBit
	*/
	LedService: {
		/**
			LED Service UUID
			<br><br>
			<b>[UUID]</b><br>
				E95DD91D251D470AA062FA1922DFA9A8
			<br><br>
			<b>[Summary]</b><br>
				Provides access to and control of LED state. Allows the state (ON or OFF) of all 25 LEDs to be set in a single write operation. 
				Allows short text strings to be sent by a client for display on the LED matrix and scrolled across at a speed controlled by the Scrolling Delay characteristic.
		*/
		kService: 'e95dd91d-251d-470a-a062-fa1922dfa9a8',

		/**
			LED Matrix State characteristic UUID
			<br><br>
			<b>[UUID]</b><br>
				E95D7B77251D470AA062FA1922DFA9A8
			<br><br>
			<b>[Summary]</b><br>
				Allows the state of any|all LEDs in the 5x5 grid to be set to on or off with a single GATT operation.
				Consists of an array of 5 x utf8 octets, each representing one row of 5 LEDs.
				Octet 0 represents the first row of LEDs i.e. the top row when the micro:bit is viewed with the edge connector at the bottom and USB connector at the top.
				Octet 1 represents the second row and so on.
				In each octet, bit 4 corresponds to the first LED in the row, bit 3 the second and so on. 
				Bit values represent the state of the related LED: off (0) or on (1).
				So we have:
				<pre>
Octet 0, LED Row 1: bit4 bit3 bit2 bit1 bit0
Octet 1, LED Row 2: bit4 bit3 bit2 bit1 bit0
Octet 2, LED Row 3: bit4 bit3 bit2 bit1 bit0
Octet 3, LED Row 4: bit4 bit3 bit2 bit1 bit0
Octet 4, LED Row 5: bit4 bit3 bit2 bit1 bit0 </pre>
			<br>
			<b>[Fields]</b><br>
				1. LED_Matrix_State : uint8[]
		*/
		kLedMatrixState: 'e95d7b77-251d-470a-a062-fa1922dfa9a8',

		/**
			LED Text characteristic UUID
			<br><br>
			<b>[UUID]</b><br>
				E95D93EE251D470AA062FA1922DFA9A8
			<br><br>
			<b>[Summary]</b><br>
				A short UTF-8 string to be shown on the LED display. Maximum length 20 octets.
			<br><br>
			<b>[Fields]</b><br>
				1. LED_Text_Value : utf8s
		*/
		kLedText: 'e95d93ee-251d-470a-a062-fa1922dfa9a8',

		/**
			Scrolling Delay characteristic UUID
			<br><br>
			<b>[UUID]</b><br>
				E95D0D2D251D470AA062FA1922DFA9A8
			<br><br>
			<b>[Summary]</b><br>
				Specifies a millisecond delay to wait for in between showing each character on the display.
			<br><br>
			<b>[Fields]</b><br>
				1. Scrolling_Delay_Value : uint16
		*/
		kScrollingDelay: 'e95d0d2d-251d-470a-a062-fa1922dfa9a8'
	},

	/**
		micro:bit Bluetooth UART Service
		@namespace	UartService
		@memberof	MicroBit
	*/
	UartService: {
		/**
			UART Service UUID
			<br><br>
			<b>[UUID]</b><br>
				6E400001B5A3F393E0A9E50E24DCCA9E
			<br><br>
			<b>[Summary]</b><br>
				This is an implementation of Nordic Semicondutor's UART/Serial Port Emulation over Bluetooth low energy.
				<br>
				See https://developer.nordicsemi.com/nRF5_SDK/nRF51_SDK_v8.x.x/doc/8.0.0/s110/html/a00072.html
				<br>
				for the original Nordic Semiconductor documentation by way of background.
		*/
		kService: '6e400001-b5a3-f393-e0a9-e50e24dcca9e',

		/**
			TX Characteristic UUID
			<br><br>
			<b>[UUID]</b><br>
				6E400002B5A3F393E0A9E50E24DCCA9E
			<br><br>
			<b>[Summary]</b><br>
				This characteristic allows the micro:bit to transmit a byte array containing an arbitrary number of arbitrary octet values to a connected device.
				The maximum number of bytes which may be transmitted in one PDU is limited to the MTU minus three or 20 octets to be precise.
				Specifies a millisecond delay to wait for in between showing each character on the display.
			<br><br>
			<b>[Fields]</b><br>
				1. UART TX Field : uint8[]
		*/
		kTxCharacteristic: '6e400002-b5a3-f393-e0a9-e50e24dcca9e',

		/**
			RX Characteristic UUID
			<br><br>
			<b>[UUID]</b><br>
				6E400003B5A3F393E0A9E50E24DCCA9E
			<br><br>
			<b>[Summary]</b><br>
				This characteristic allows a connected client to send a byte array containing an arbitrary number of arbitrary octet values to a connected micro:bit.
				The maximum number of bytes which may be transmitted in one PDU is limited to the MTU minus three or 20 octets to be precise.
				Specifies a millisecond delay to wait for in between showing each character on the display.
			<br><br>
			<b>[Fields]</b><br>
				1. UART TX Field : uint8[]
		*/
		kRxCharacteristic: '6e400003-b5a3-f393-e0a9-e50e24dcca9e'
	}
};

// ------------------------------------------------------------
//	HTML Framework
// ------------------------------------------------------------

/**	@classdesc
		A {@link TextArea} obejct represents a html element of `&lt;input type="text">` or `&lt;textarea>`.
*/
class TextArea {
	/**
		constructor
		@param {String} id - a id string for a `&lt;input type="text">` or `&lt;textarea>` element
	*/
	constructor(id) {
		/**	@member {String} - the id of the element
		*/
		this.id = id;

		/**	@member {Element} - the target `Element` (`HTMLInputElement` or HTMLTextAreaElement`)
		*/
		this.target = null;
	}

	/**
		(set/get) text of the element
		@type {String}
	*/
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

/**	@classdesc
		A {@link Button} obejct represents a html element of `&lt;button>`.
		<br>
		The class can handle events of type `click`.
*/
class Button {
	/**
		constructor
		@param {String} id - a id string for a `&lt;button>` element
	*/
	constructor(id) {
		/**	@member {String} - the id of the element
		*/
		this.id = id;

		/**	@member {Element} - the target `Element` (`HTMLButtonElement`)
		*/
		this.target = null;
	}

	/**
		Add click event listener
		@param {function(Event)} listener - a click event listener
	*/
	addClickEventListener(listener) {
		if(!this.target) {
			this.target = document.getElementById(this.id);
		}
		this.target.addEventListener('click', listener, false);
	}
}

// ------------------------------------------------------------
//	Bluetooth GATT Framework
// ------------------------------------------------------------

/**	@classdesc
		A {@link BtgServer} obejct represents a GATT server on a remote Bluetooth device.
*/
class BtgServer {
	/**
		constructor
		@param {BluetoothDevice} device - a Bluetooth device
		@param {BluetoothRemoteGATTServer} server - a Bluetooth GATT server of the device
		@param {Array(UUID)} serviceUuidList - a list of service UUID for the server
	*/
	constructor(device, server, serviceUuidList) {
		/**	@member {BluetoothDevice} - the connected Bluetooth device
		*/
		this.device = device;

		/**	@member {BluetoothRemoteGATTServer} - the target Bluetooth GATT server of the device
		*/
		this.target = server;

		/**	@member {Array(UUID)} - the list of service UUID of the server
		*/
		this.uuidList = serviceUuidList;

		/**	@member {Map(UUID, BtgService)} - the list of registered service of the server
		*/
		this.services = new Map();

		/**	@member {Map(UUID, BtgCharacteristic)} - the list of registered characteristic of the server
		*/
		this.characteristics = new Map();
	}

	/**
		Get primary services from the target Bluetooth GATT server
		@returns {Array(BluetoothGATTService)}
	*/
	getPrimaryServices() {
		return this.uuidList.map(x => this.target.getPrimaryService(x));
	}

	/**
		Get characteristics for all primary services from the target Bluetooth GATT server
		@returns {Array(BluetoothGATTCharacteristic)}
	*/
	getCharacteristics() {
		return this.uuidList.flatMap(x => this.services.get(x).getCharacteristics());
	}

	/**
		Register a Bluetooth GATT service
		@param {UUID} uuid - a UUID
		@param {BtgService} btService - a Bluetooth GATT service for the UUID
	*/
	registerService(uuid, btService) {
		this.services.set(uuid, btService);
	}

	/**
		Get a registered Bluetooth GATT service for a UUID
		@param {UUID} uuid - a UUID
		@returns {BtgService}
	*/
	getService(uuid) {
		return this.services.get(uuid);
	}

	/**
		Register a Bluetooth GATT characteristic
		@param {UUID} uuid - a UUID
		@param {BtgCharacteristic} characteristic - a Bluetooth GATT characteristic for the UUID
	*/
	registerCharacteristic(uuid, characteristic) {
		this.characteristics.set(uuid, characteristic);
	}

	/**
		Get a registered Bluetooth GATT characteristic for a UUID
		@param {UUID} uuid - a UUID
		@returns {BtgCharacteristic}
	*/
	getCharacteristic(uuid) {
		return this.characteristics.get(uuid);
	}
}

/**	@classdesc
		A {@link BtgService} obejct represents a GATT service on a remote Bluetooth device.
*/
class BtgService {
	/**
		@param {BtgServer} server - a Bluetooth GATT server
		@param {Array(BluetoothGATTService)} services - a List of Bluetooth GATT service for the server
		@param {Array(Array(UUID))} characteristicUuidLists - a List of characteristic UUID List for the server
	*/
	static registerServices(server, services, characteristicUuidLists) {
		let i = 0;
		let service;
		for (service of services) {
			// create an object and register it to the server.
			new BtgService(server, service, characteristicUuidLists[i++]);
		}
	}
	/**
		constructor
		@param {BtgServer} server - a Bluetooth GATT server
		@param {BluetoothGATTService} service - a Bluetooth GATT service of the server
		@param {Array(UUID)} characteristicUuidList - a List of characteristic UUID for the service
	*/
	constructor(server, service, characteristicUuidList) {
		/**	@member {BtgServer} - the connected Bluetooth GATT server
		*/
		this.server = server;

		/**	@member {BluetoothGATTService} - the target Bluetooth GATT service
		*/
		this.target = service;

		/**	@member {Array(UUID)} - the list of characteristic UUID for the service
		*/
		this.uuidList = characteristicUuidList;

		this.init();
	}

	/**
		Initialize the object
	*/
	init() {
		this.server.registerService(this.target.uuid, this);
	}

	/**
		Get characteristics from the target service
		@returns {Array(BluetoothGATTCharacteristic)}
	*/
	getCharacteristics() {
		return this.uuidList.map(x => this.target.getCharacteristic(x));
	}
}

/**	@classdesc
		A {@link BtgCharacteristic} obejct represents a GATT characteristic on a remote Bluetooth device.
*/
class BtgCharacteristic {
	/**
		@param {BtgServer} server - a Bluetooth GATT server
		@param {Array(BluetoothGATTCharacteristic)} characteristics - a List of Bluetooth GATT characteristic for a service of the server
	*/
	static registerCharacteristics(server, characteristics) {
		let characteristic;
		for (characteristic of characteristics) {
			// create an object and register it to the server.
			new BtgCharacteristic(server, characteristic);
		}
	}

	/**
		constructor
		@param {BtgServer} server - a Bluetooth GATT server
		@param {BluetoothGATTCharacteristic} characteristic - a Bluetooth GATT characteristic of the server
	*/
	constructor(server, characteristic) {
		/**	@member {BtgServer} - the connected Bluetooth GATT server
		*/
		this.server = server;

		/**	@member {BluetoothGATTCharacteristic} - the target Bluetooth GATT characteristic of the server
		*/
		this.target = characteristic;

		/**	@member {function(ArrayBuffer)|function(String)} - the receiver function for {@link BtgCharacteristic#readData} or {@link BtgCharacteristic#readText}
		*/
		this.receiver = null;

		this.init();
	}

	/**
		Initialize the object
	*/
	init() {
		this.server.registerCharacteristic(this.target.uuid, this);
	}

	/**
		Add value changed event listener
		@param {function(Event)} listener - a value changed event listener
	*/
	addValueChangedEventListener(listener) {
		this.target.startNotifications().then(characteristic => {	// BluetoothRemoteGATTCharacteristic
			characteristic.addEventListener('characteristicvaluechanged', listener);
		});
	}

	/**
		Request to read data
		<br><br>
		{@link BtgCharacteristic#receiver} is called when the data is ready
	*/
	readData() {
		this.target.readValue().then(data => {	// data: ArrayBuffer
			this.receiver(data);
		}).catch(reason => {
			alert(reason);
		});
	}

	/**
		Request to read text
		<br><br>
		{@link BtgCharacteristic#receiver} is called when the text is ready
	*/
	readText() {
		this.target.readValue().then(data => {	// data: ArrayBuffer
			const decoder = new TextDecoder();
			const text = decoder.decode(data);
			this.receiver(text);
		}).catch(reason => {
			alert(reason);
		});
	}

	/**
		Write data
	*/
	writeData(data) {	// data: ArrayBuffer
		this.target.writeValue(data);
	}

	/**
		Write text
	*/
	writeText(text) {	// text: String
		let length = text.length;
		if(length > 0) {
			const encoder = new TextEncoder();
			this.target.writeValue(encoder.encode(text));
		}
	}
}

// ------------------------------------------------------------
//	Global variables for the interface to html elements
// ------------------------------------------------------------

/**
	Connect button
	@var	{Button}
*/
let gConnectButton		= new Button('id_button_connect');

/**
	Disconnect button
	@var	{Button}
*/
let gDisconnectButton	= new Button('id_button_disconnect');

/**
	Show Message button
	@var	{Button}
*/
let gShowMessageButton	= new Button('id_button_show_message');

/**
	Send Request button
	@var	{Button}
*/
let gSendRequestButton	= new Button('id_button_send_request');

/**
	Conection Status field
	@var	{TextArea}
*/
let gConnectionStatusTextArea	= new TextArea('id_input_text_connection_status');

/**
	Model Number field
	@var	{TextArea}
*/
let gModelNumberTextArea		= new TextArea('id_input_text_model_number');

/**
	Firmware Revision field
	@var	{TextArea}
*/
let gFirmwareRevisionTextArea	= new TextArea('id_input_text_firmware_revision');

/**
	Button Status field
	@var	{TextArea}
*/
let gButtonStatusTextArea		= new TextArea('id_input_text_button_status');

/**
	Message field
	@var	{TextArea}
*/
let gMessageTextArea			= new TextArea('id_input_text_message');

/**
	Request field
	@var	{TextArea}
*/
let gRequesTextArea				= new TextArea('id_input_text_request');

/**
	Response field
	@var	{TextArea}
*/
let gResponseTextArea			= new TextArea('id_input_text_response');

// ------------------------------------------------------------
//	Global variables for the interface to a Bluetooth device
// ------------------------------------------------------------

/**
	The connected Bluetooth device. null if no device is selected.
	@var	{BluetoothDevice}
*/
let gBtDevice = null;

/**
	The GATT server on the connected Bluetooth device. null if no server is available.
	@var	{BtgServer}
*/
let gBtgServer = null;

/**
	The Bluetooth device filter to exclude incompatible devices from the list to choose a device.
	@namespace	sBtDeviceFilter
*/
const sBtDeviceFilter = {
	/**
		Device name prefix
	*/
	namePrefix: 'BBC micro:bit'	// e.g., 'BBC micro:bit [vagip]'
};

/**
	The list of Bluetooth service uuid.
	@var	{Array(UUID)}
*/
const sBtgServiceUuidList = [
	MicroBit.DeviceInformation.kService,
	MicroBit.ButtonService.kService,
	MicroBit.LedService.kService,
	MicroBit.UartService.kService
];

/**
	The list of Bluetooth characteristic uuid for each service.
	<br><br>
	Note that the access to {@limnk MicroBit.DeviceInformation.kSerialNumberString} is blocked with the following error.
	<br>
	- SecurityError: getCharacteristic(s) called with blocklisted UUID.
	<br>
	See also
	<br>
	- {@link https://goo.gl/4NeimX}
	@var	{Array(Array(UUID))}
*/
const sBtgCharacteristicUuidList = [
	[
		MicroBit.DeviceInformation.kModelNumberString,
	//	MicroBit.DeviceInformation.kSerialNumberString,
		MicroBit.DeviceInformation.kFirmwareRevisionString
	],
	[
		MicroBit.ButtonService.kButtonAState,
		MicroBit.ButtonService.kButtonBState
	],
	[
		MicroBit.LedService.kLedMatrixState,
		MicroBit.LedService.kLedText,
		MicroBit.LedService.kScrollingDelay
	],
	[
		MicroBit.UartService.kTxCharacteristic,
		MicroBit.UartService.kRxCharacteristic
	]
];

// ------------------------------------------------------------
//	Constants
// ------------------------------------------------------------

/**
	micro:bit LED's scrolling delay in milliseconds.
	@var	{Number}
*/
const kMicroBitLedScrollingDelayInMilliseconds = 100;

// ------------------------------------------------------------
//
//	No JSDoc documentation for the part below
//
// ------------------------------------------------------------

// ------------------------------------------------------------
//	Implementation for window events (No JSDoc)
// ------------------------------------------------------------

window.onload = onLoadWindow;

function onLoadWindow() {
	window.onbeforeunload = onBeforeUnloadWindow;

	gConnectButton.addClickEventListener(onClickConnectButton);
	gDisconnectButton.addClickEventListener(onClickDisconnectButton);
	gShowMessageButton.addClickEventListener(onClickShowMessageButton);
	gSendRequestButton.addClickEventListener(onClickSendRequestButton);
}

function onBeforeUnloadWindow() {
	if(gBtDevice && gBtDevice.gatt.connected) {
		gBtDevice.gatt.disconnect();
	}
}

// ------------------------------------------------------------
//	Implementation for Bluetooth connection
// ------------------------------------------------------------

function onClickConnectButton() {
	if (!navigator.bluetooth) {
		alert(`Web Bluetooth is not available on this browser.`);
		return;
	}

	gConnectionStatusTextArea.text = 'Connecting...';
	navigator.bluetooth.requestDevice({
		filters: [sBtDeviceFilter],
		optionalServices: sBtgServiceUuidList
	}).then(device => {		// device: BluetoothDevice
		gBtDevice = device;
		return device.gatt.connect();
	}).then(server => {		// server: BluetoothRemoteGATTServer
		gBtgServer = new BtgServer(gBtDevice, server, sBtgServiceUuidList);
		return Promise.all(gBtgServer.getPrimaryServices());
	}).then(services => {	// services: [ BluetoothGATTService ]
		BtgService.registerServices(gBtgServer, services, sBtgCharacteristicUuidList);
		return Promise.all(gBtgServer.getCharacteristics());
	}).then(characteristics => {	// characteristics: [ BluetoothGATTCharacteristic ]
		BtgCharacteristic.registerCharacteristics(gBtgServer, characteristics);
		handleConnected();
		gConnectionStatusTextArea.text = 'Connected';
	}).catch(reason => {
		gConnectionStatusTextArea.text = 'Connection Failed';	// this update is suspended while the alert below is open
		alert(reason);
	});
}

function handleConnected() {
	retrieveDeviceInformation();
	setScrollingDelay();
	observeButtons();
	observeUart();
}

function onClickDisconnectButton() {
	if(gBtDevice && gBtDevice.gatt.connected) {
		gBtDevice.gatt.disconnect();
		if(gBtDevice.gatt.connected) {
			gConnectionStatusTextArea.text = 'Disconnection Failed';
		}
		else {
			gConnectionStatusTextArea.text = 'Disconnected';
		}
	}
	else {
		gConnectionStatusTextArea.text = 'Not Connected';
	}
	gBtDevice = null;
}

// ------------------------------------------------------------
//	Implementation for micro:bit's Device Information Service
// ------------------------------------------------------------

function retrieveDeviceInformation() {
	let characteristic = gBtgServer.getCharacteristic(MicroBit.DeviceInformation.kModelNumberString);
	if(characteristic) {
		characteristic.receiver = function (text) {
			gModelNumberTextArea.text = text;
		};
		characteristic.readText();
	}
	characteristic = gBtgServer.getCharacteristic(MicroBit.DeviceInformation.kFirmwareRevisionString);
	if(characteristic) {
		characteristic.receiver = function (text) {
			gFirmwareRevisionTextArea.text = text;
		};
		characteristic.readText();
	}
}

// ------------------------------------------------------------
//	Implementation for micro:bit's Button Service
// ------------------------------------------------------------

function observeButtons()
{
	let characteristic;
	characteristic = gBtgServer.getCharacteristic(MicroBit.ButtonService.kButtonAState);
	if(characteristic) {
		characteristic.addValueChangedEventListener(handleButtonAStateChanged);
	}
	characteristic = gBtgServer.getCharacteristic(MicroBit.ButtonService.kButtonBState);
	if(characteristic) {
		characteristic.addValueChangedEventListener(handleButtonBStateChanged);
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
//	Implementation for micro:bit's LED Service
// ------------------------------------------------------------

function setScrollingDelay() {
	const characteristic = gBtgServer.getCharacteristic(MicroBit.LedService.kScrollingDelay);
	if(!characteristic) {
		return;
	}
	//	use platform's endianness as
	//		let data = Uint16Array.of(kMicroBitLedScrollingDelayInMilliseconds);
	//	or use little endian explicitly
	let data = new DataView(new ArrayBuffer(2));
	data.setUint16(0, kMicroBitLedScrollingDelayInMilliseconds, true);
	characteristic.writeData(data);
}

function onClickShowMessageButton() {
	const characteristic = gBtgServer.getCharacteristic(MicroBit.LedService.kLedText);
	if(!characteristic) {
		return;
	}
	try {
		const text = gMessageTextArea.text;
		const length = text.length;
		if(length > 0) {
			characteristic.writeText(text);
			setTimeout(showCheckmark, kMicroBitLedScrollingDelayInMilliseconds * 6 * (length + 2));
		}
	}
	catch (reason) {
		alert(reason);
	}
}

function showCheckmark() {
	const characteristic = gBtgServer.getCharacteristic(MicroBit.LedService.kLedMatrixState);
	if(!characteristic) {
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
		characteristic.writeData(data);
	}
	catch (reason) {
		alert(reason);
	}
}

// ------------------------------------------------------------
//	Implementation for micro:bit's UART Service
// ------------------------------------------------------------

function onClickSendRequestButton() {
	const txCharacteristic = gBtgServer.getCharacteristic(MicroBit.UartService.kRxCharacteristic);
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
	let characteristic = gBtgServer.getCharacteristic(MicroBit.UartService.kTxCharacteristic);
	if(characteristic) {
		characteristic.addValueChangedEventListener(handleTxCharacteristicChanged);
	}
}

function handleTxCharacteristicChanged(event) {
	const data = event.target.value;
	const decoder = new TextDecoder();
	const text = decoder.decode(data);
	gResponseTextArea.text = text;
}

// ------------------------------------------------------------
