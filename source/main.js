/* eslint-env browser, es6 */
/*
	@see
		https://eslint.org/docs/user-guide/configuring#specifying-environments
*/

// ------------------------------------------------------------
//	file
// ------------------------------------------------------------

/**	@file
	@description
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
		/**	@member {String}
		*/
		this.id = id;
		/**	@member {Element}
		*/
		this.target = null;
	}

	/**
		set text
		@param {String} text
	*/
	set text(newValue) {
		if(!this.target) {
			this.target = document.getElementById(this.id);
		}
		this.target.value = newValue;
	}

	/**
		get text
		@return {String}
	*/
	get text() {
		if(!this.target) {
			this.target = document.getElementById(this.id);
		}
		return this.target.value;
	}
}

/**	@classdesc
		A {@link Button} obejct represents a html element of `&lt;button>`.
		The object can handle events of type `click`.
*/
class Button {
	/**
		constructor
		@param {String} id - a id string for a `&lt;button>` element
	*/
	constructor(id) {
		/**	@member {String}
		*/
		this.id = id;
		/**	@member {Element}
		*/
		this.target = null;
	}

	/**
		@param {function(Event)} listener
	*/
	addClickEventListener(listener) {
		if(!this.target) {
			this.target = document.getElementById(this.id);
		}
		this.target.addEventListener('click', listener, false);
	}
}

// ------------------------------------------------------------
//	Bluetooth Framework
// ------------------------------------------------------------

/**	@classdesc
		A `BtServer` obejct represents a GATT server on a remote Bluetooth device.
*/
class BtServer {
	/**
		constructor
		@param {BluetoothDevice} device - a Bluetooth Device
		@param {BluetoothRemoteGATTServer} bluetoothServer - a Bluetooth Server
		@param {Array(UUID)} serviceUuidList - a list of Service UUID for the Server
	*/
	constructor(bluetoothDevice, bluetoothServer, serviceUuidList) {
		/**	@member {BluetoothDevice} - the Bluetooth Device
		*/
		this.device = bluetoothDevice;

		/**	@member {BluetoothRemoteGATTServer} - the target Bluetooth Server
		*/
		this.target = bluetoothServer;

		/**	@member {Array(UUID)} - the list of Service UUID for the Server
		*/
		this.uuidList = serviceUuidList;

		/**	@member {Map(UUID, BtService)} - the list of registered BT Service
		*/
		this.btServices = new Map();

		/**	@member {Map(UUID, BtCharacteristic)} - the list of registered BT Characteristic
		*/
		this.btCharacteristics = new Map();
	}

	/**
		Get Primary Bluetooth Services from the target server
		@returns {Array(BluetoothGATTService)}
	*/
	getPrimaryServices() {
		return this.uuidList.map(x => this.target.getPrimaryService(x));
	}

	/**
		Get Bluetooth Characteristics from the target services
		@returns {Array(BluetoothGATTCharacteristic)}
	*/
	getCharacteristics() {
		return this.uuidList.flatMap(x => this.btServices.get(x).getCharacteristics());
	}

	/**
		Register a BT Service
		@param {UUID} uuid - a UUID
		@param {BtService} btService - a BT Service
	*/
	registerBtService(uuid, btService) {
		this.btServices.set(uuid, btService);
	}

	/**
		Get a registered BT Service for a UUID
		@param {UUID} uuid - a UUID
		@returns {BtService}
	*/
	getBtService(uuid) {
		return this.btServices.get(uuid);
	}

	/**
		Register a BT Characteristic
		@param {UUID} uuid - a UUID
		@param {BtCharacteristic} btCharacteristic - a BT Characteristic
	*/
	registerBtCharacteristic(uuid, btCharacteristic) {
		this.btCharacteristics.set(uuid, btCharacteristic);
	}

	/**
		Get a registered BT Characteristic for a UUID
		@param {UUID} uuid - a UUID
		@returns {BtCharacteristic}
	*/
	getBtCharacteristic(uuid) {
		return this.btCharacteristics.get(uuid);
	}
}

/**	@classdesc
		A `BtService` obejct represents a GATT service on a remote Bluetooth device.
*/
class BtService {
	/**
		@param {BtServer} btServer - a BT Server
		@param {Array(BluetoothGATTService)} bluetoothServices - a List of Bluetooth Service for the server
		@param {Array(Array(UUID))} characteristicUuidLists - a List of Characteristic UUID List for the server
	*/
	static registerServices(btServer, bluetoothServices, characteristicUuidLists) {
		let i = 0;
		let bluetoothService;
		for (bluetoothService of bluetoothServices) {
			// create an object and register it to the btServer.
			new BtService(btServer, bluetoothService, characteristicUuidLists[i++]);
		}
	}
	/**
		constructor
		@param {BtServer} btServer - a BT Server
		@param {BluetoothGATTService} bluetoothService - a Bluetooth Service
		@param {Array(UUID)} characteristicUuidList - a List of Characteristic UUID for the service
	*/
	constructor(btServer, bluetoothService, characteristicUuidList) {
		/**	@member {BtServer} - the BT Server
		*/
		this.btServer = btServer;

		/**	@member {BluetoothGATTService} - the target Bluetooth Service
		*/
		this.target = bluetoothService;

		/**	@member {Array(UUID)} - the list of Characteristic UUID for the service
		*/
		this.uuidList = characteristicUuidList;

		this.init();
	}

	/**
		Initialize the object
	*/
	init() {
		this.btServer.registerBtService(this.target.uuid, this);
	}

	/**
		Get Bluetooth Characteristics from the target service
		@returns {Array(BluetoothGATTCharacteristic)}
	*/
	getCharacteristics() {
		return this.uuidList.map(x => this.target.getCharacteristic(x));
	}
}

/**	@classdesc
		A `BtCharacteristic` obejct represents a GATT characteristic on a remote Bluetooth device.
*/
class BtCharacteristic {
	/**
		@param {BtServer} btServer - a BT Server
		@param {Array(BluetoothGATTCharacteristic)} bluetoothCharacteristics - a List of Bluetooth Characteristic
	*/
	static registerCharacteristics(btServer, bluetoothCharacteristics) {
		let bluetoothCharacteristic;
		for (bluetoothCharacteristic of bluetoothCharacteristics) {
			// create an object and register it to the btServer.
			new BtCharacteristic(btServer, bluetoothCharacteristic);
		}
	}

	/**
		constructor
		@param {BtServer} btServer - a BT Server
		@param {BluetoothGATTCharacteristic} bluetoothCharacteristic - a Bluetooth Characteristic
	*/
	constructor(btServer, bluetoothCharacteristic) {
		/**	@member {BtServer} - the BT Server
		*/
		this.btServer = btServer;

		/**	@member {BluetoothGATTCharacteristic} - the target Bluetooth Characteristic
		*/
		this.target = bluetoothCharacteristic;

		/**	@member {function(ArrayBuffer)|function(String)} - the receiver function for {@link BtCharacteristic#readData} or {@link BtCharacteristic#readText}
		*/
		this.receiver = null;

		this.init();
	}

	/**
		Initialize the object
	*/
	init() {
		this.btServer.registerBtCharacteristic(this.target.uuid, this);
	}

	/**
		Add Value Changed Event Listener
		@param {function(Event)} listener - Value Changed Event Listener
	*/
	addValueChangedEventListener(listener) {
		this.target.startNotifications().then(characteristic => {	// BluetoothRemoteGATTCharacteristic
			characteristic.addEventListener('characteristicvaluechanged', listener);
		});
	}

	/**
		Request to read data
		<br><br>
		{@link BtCharacteristic#receiver} is called when the data is ready
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
		{@link BtCharacteristic#receiver} is called when the text is ready
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
//	Interface to the html
// ------------------------------------------------------------

/**
	The global {@link Button} obejct for Connect button
	@var	{Button}
*/
let gConnectButton		= new Button('id_button_connect');

/**
	The global {@link Button} obejct for Disconnect button
	@var	{Button}
*/
let gDisconnectButton	= new Button('id_button_disconnect');

/**
	The global {@link Button} obejct for Show Message button
	@var	{Button}
*/
let gShowMessageButton	= new Button('id_button_show_message');

/**
	The global {@link Button} obejct for Send Request button
	@var	{Button}
*/
let gSendRequestButton	= new Button('id_button_send_request');

/**
	The global {@link TextArea} obejct for Conection Status field
	@var	{TextArea}
*/
let gConnectionStatusTextArea	= new TextArea('id_input_text_connection_status');

/**
	The global {@link TextArea} obejct for Model Number field
	@var	{TextArea}
*/
let gModelNumberTextArea		= new TextArea('id_input_text_model_number');

/**
	The global {@link TextArea} obejct for Firmware Revision field
	@var	{TextArea}
*/
let gFirmwareRevisionTextArea	= new TextArea('id_input_text_firmware_revision');

/**
	The global {@link TextArea} obejct for Button Status field
	@var	{TextArea}
*/
let gButtonStatusTextArea		= new TextArea('id_input_text_button_status');

/**
	The global {@link TextArea} obejct for Message field
	@var	{TextArea}
*/
let gMessageTextArea			= new TextArea('id_input_text_message');

/**
	The global {@link TextArea} obejct for Request field
	@var	{TextArea}
*/
let gRequesTextArea				= new TextArea('id_input_text_request');

/**
	The global {@link TextArea} obejct for Response field
	@var	{TextArea}
*/
let gResponseTextArea			= new TextArea('id_input_text_response');

// ------------------------------------------------------------
//	Interface to the Bluetooth device
// ------------------------------------------------------------

/**
	The global `BluetoothDevice` obejct for the connected Bluetooth device
	@var	{BluetoothDevice}
*/
let gDevice = null;

/**
	The global {@link BtServer} obejct for the connected Bluetooth device
	@var	{BtServer}
*/
let gBtServer = null;

/**
	Bluetooth device filter
	@namespace	sBtDeviceFilter
*/
const sBtDeviceFilter = {
	/**
		Device name prefix
	*/
	namePrefix: 'BBC micro:bit'	// e.g., 'BBC micro:bit [vagip]'
};

/**
	The list of Bluetooth service uuid
	@var	{Array(UUID)}
*/
const sBtServiceUuidList = [
	MicroBit.DeviceInformation.kService,
	MicroBit.ButtonService.kService,
	MicroBit.LedService.kService,
	MicroBit.UartService.kService
];

/**
	The list of Bluetooth characteristic uuid for each service
	<br><br>
	Note that `kSerialNumberString` is blocked with the following error.
	<br>
	- SecurityError: getCharacteristic(s) called with blocklisted UUID.
	<br>
	See also
	<br>
	- {@link https://goo.gl/4NeimX}
	@var	{Array(Array(UUID))}
*/
const sBtCharacteristicUuidList = [
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

/**
	Scrolling Delay In Milliseconds
	@var	{Number}
*/
const kScrollingDelayInMilliseconds = 100;

// ------------------------------------------------------------
//	Window events
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
	if(gDevice && gDevice.gatt.connected) {
		gDevice.gatt.disconnect();
	}
}

// ------------------------------------------------------------
//	Bluetooth connection
// ------------------------------------------------------------

function onClickConnectButton() {
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

function onClickDisconnectButton() {
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
//	Device Information Service
// ------------------------------------------------------------

function retrieveDeviceInformation() {
	let btCharacteristic = gBtServer.getBtCharacteristic(MicroBit.DeviceInformation.kModelNumberString);
	if(btCharacteristic) {
		btCharacteristic.receiver = function (text) {
			gModelNumberTextArea.text = text;
		};
		btCharacteristic.readText();
	}
	btCharacteristic = gBtServer.getBtCharacteristic(MicroBit.DeviceInformation.kFirmwareRevisionString);
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
	btCharacteristic = gBtServer.getBtCharacteristic(MicroBit.ButtonService.kButtonAState);
	if(btCharacteristic) {
		btCharacteristic.addValueChangedEventListener(handleButtonAStateChanged);
	}
	btCharacteristic = gBtServer.getBtCharacteristic(MicroBit.ButtonService.kButtonBState);
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
	const btCharacteristic = gBtServer.getBtCharacteristic(MicroBit.LedService.kScrollingDelay);
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

function onClickShowMessageButton() {
	const btCharacteristic = gBtServer.getBtCharacteristic(MicroBit.LedService.kLedText);
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
	const btCharacteristic = gBtServer.getBtCharacteristic(MicroBit.LedService.kLedMatrixState);
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

function onClickSendRequestButton() {
	const txCharacteristic = gBtServer.getBtCharacteristic(MicroBit.UartService.kRxCharacteristic);
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
	let btCharacteristic = gBtServer.getBtCharacteristic(MicroBit.UartService.kTxCharacteristic);
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
