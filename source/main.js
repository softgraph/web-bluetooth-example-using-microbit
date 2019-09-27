/* eslint-env browser, es6 */

// ------------------------------------------------------------
//	file
// ------------------------------------------------------------

/**	@file
		Main implementation on the browser side for the Web Bluetooth example using BBC micro:bit.
	@author
		Copyright (c) 2019 Tomoyuki Nakashima.
	@license
		This code is licensed under MIT license.
		See `LICENSE` in the project root for more information.
	@see
		- {@link
			https://github.com/softgraph/web-bluetooth-example-using-microbit
			Web Bluetooth example using BBC micro:bit
			}
			(github.com)
		<br>
		- {@link
			https://eslint.org/docs/user-guide/configuring#specifying-environments
			ESLint / Specifying Environments
			}
			(eslint.org)
		<br>
		- {@link
			https://jsdoc.app
			&#64;use JSDoc
			}
			(jsdoc.app)
*/

// ------------------------------------------------------------
//	micro:bit Bluetooth Profile
// ------------------------------------------------------------

/**
	micro:bit Bluetooth Profile
	@namespace	MicroBit
	@see
		- {@link
			https://lancaster-university.github.io/microbit-docs/ble/profile/
			micro:bit Bluetooth Profile
			}
			(lancaster-university.github.io)
		<br>
		- {@link
			https://lancaster-university.github.io/microbit-docs/resources/bluetooth/bluetooth_profile.html
			micro:bit Bluetooth profile specification
			}
			(lancaster-university.github.io)
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

		/**
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
			<br><br>
			Note that the access to this characteristic is blocked with the following error.
			<pre>	SecurityError: getCharacteristic(s) called with blocklisted UUID.	</pre>
			@see
				{@link https://goo.gl/4NeimX}
		*/
		kSerialNumberString: '00002a25-0000-1000-8000-00805f9b34fb',

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
		@param	{String} id - a id string for a `&lt;input type="text">` or `&lt;textarea>` element
	*/
	constructor(id) {
		/**	@member	{String} - the id of the element
		*/
		this._id = id;

		/**	@member	{Element} - the target `Element` (`HTMLInputElement` or HTMLTextAreaElement`)
		*/
		this._target = null;
	}

	/**
		(get/set) the text of the element
		@type	{String}
	*/
	get text() {
		if (!this._target) {
			this._target = document.getElementById(this._id);
		}
		return this._target.value;
	}
	set text(newValue) {
		if (!this._target) {
			this._target = document.getElementById(this._id);
		}
		this._target.value = newValue;
	}
}

/**	@classdesc
		A {@link Button} obejct represents a html element of `&lt;button>`.
		The class can handle events of type `click`.
*/
class Button {
	/**
		constructor
		@param	{String} id - a id string for a `&lt;button>` element
	*/
	constructor(id) {
		/**	@member	{String} - the id of the element
		*/
		this._id = id;

		/**	@member	{Element} - the target `Element` (`HTMLButtonElement`)
		*/
		this._target = null;
	}

	/**
		Add click event listener
		@param	{function(Event)} listener - a click event listener
	*/
	addClickEventListener(listener) {
		if (!this._target) {
			this._target = document.getElementById(this._id);
		}
		this._target.addEventListener('click', listener, false);
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
		@param	{BluetoothDevice} device - a Bluetooth device
		@param	{BluetoothRemoteGATTServer} server - a Bluetooth Remote GATT Server of the device
		@param	{Array(UUID)} serviceUuidList - a list of service UUID for the server
	*/
	constructor(device, server, serviceUuidList) {
		/**	@member	{BluetoothDevice} - the connected Bluetooth device
		*/
		this._device = device;

		/**	@member	{BluetoothRemoteGATTServer} - the target Bluetooth Remote GATT Server of the device
		*/
		this._target = server;

		/**	@member	{Array(UUID)} - the list of service UUID of the server
		*/
		this._uuidList = serviceUuidList;

		/**	@member	{Map(UUID, BtgService)} - the list of registered service of the server
		*/
		this._services = new Map();

		/**	@member	{Map(UUID, BtgCharacteristic)} - the list of registered characteristic of the server
		*/
		this._characteristics = new Map();
	}

	/**
		Get primary Bluetooth Remote GATT Services from the target server
		@returns	{Array(BluetoothRemoteGATTService)}
	*/
	getPrimaryServices() {
		return this._uuidList.map(x => this._target.getPrimaryService(x));
	}

	/**
		Get Bluetooth Remote GATT Characteristics for all primary services from the target server
		@returns	{Array(BluetoothRemoteGATTCharacteristic)}
	*/
	getCharacteristics() {
		return this._uuidList.flatMap(x => this._services.get(x).getCharacteristics());
	}

	/**
		Register a Bluetooth GATT Service
		@param	{UUID} uuid - a UUID
		@param	{BtgService} btService - a Bluetooth GATT Service for the UUID
	*/
	registerService(uuid, btService) {
		this._services.set(uuid, btService);
	}

	/**
		Get a registered Bluetooth GATT Service for a UUID
		@param	{UUID} uuid - a UUID
		@returns	{BtgService}
	*/
	getService(uuid) {
		return this._services.get(uuid);
	}

	/**
		Register a Bluetooth GATT Characteristic
		@param	{UUID} uuid - a UUID
		@param	{BtgCharacteristic} characteristic - a Bluetooth GATT Characteristic for the UUID
	*/
	registerCharacteristic(uuid, characteristic) {
		this._characteristics.set(uuid, characteristic);
	}

	/**
		Get a registered Bluetooth GATT Characteristic for a UUID
		@param	{UUID} uuid - a UUID
		@returns	{BtgCharacteristic}
	*/
	getCharacteristic(uuid) {
		return this._characteristics.get(uuid);
	}
}

/**	@classdesc
		A {@link BtgService} obejct represents a GATT service on a remote Bluetooth device.
*/
class BtgService {
	/**
		@param	{BtgServer} server - a Bluetooth GATT Server
		@param	{Array(BluetoothRemoteGATTService)} services - a List of Bluetooth Remote GATT Service for the server
		@param	{Array(Array(UUID))} characteristicUuidLists - a List of characteristic UUID List for the server
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
		@param	{BtgServer} server - a Bluetooth GATT Server
		@param	{BluetoothRemoteGATTService} service - a Bluetooth Remote GATT Service of the server
		@param	{Array(UUID)} characteristicUuidList - a List of characteristic UUID for the service
	*/
	constructor(server, service, characteristicUuidList) {
		/**	@member	{BtgServer} - the connected Bluetooth GATT Server
		*/
		this._server = server;

		/**	@member	{BluetoothRemoteGATTService} - the target Bluetooth Remote GATT Service
		*/
		this._target = service;

		/**	@member	{Array(UUID)} - the list of characteristic UUID for the service
		*/
		this._uuidList = characteristicUuidList;

		this.init();
	}

	/**
		Initialize the object
	*/
	init() {
		this._server.registerService(this._target.uuid, this);
	}

	/**
		Get Bluetooth Remote GATT Characteristics from the target service
		@returns	{Array(BluetoothRemoteGATTCharacteristic)}
	*/
	getCharacteristics() {
		return this._uuidList.map(x => this._target.getCharacteristic(x));
	}
}

/**	@classdesc
		A {@link BtgCharacteristic} obejct represents a GATT characteristic on a remote Bluetooth device.
*/
class BtgCharacteristic {
	/**
		@param	{BtgServer} server - a Bluetooth GATT Server
		@param	{Array(BluetoothRemoteGATTCharacteristic)} characteristics - a List of Bluetooth Remote GATT Characteristic for a service of the server
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
		@param	{BtgServer} server - a Bluetooth GATT Server
		@param	{BluetoothRemoteGATTCharacteristic} characteristic - a Bluetooth Remote GATT Characteristic of the server
	*/
	constructor(server, characteristic) {
		/**	@member	{BtgServer} - the connected Bluetooth GATT Server
		*/
		this._server = server;

		/**	@member	{BluetoothRemoteGATTCharacteristic} - the target Bluetooth Remote GATT Characteristic of the server
		*/
		this._target = characteristic;

		this.init();
	}

	/**
		Initialize the object
	*/
	init() {
		this._server.registerCharacteristic(this._target.uuid, this);
	}

	/**
		Add value changed event listener
		@param	{function(Event)} listener - a value changed event listener
	*/
	addValueChangedEventListener(listener) {
		this._target.startNotifications().then(
			// BluetoothRemoteGATTCharacteristic
			characteristic => characteristic.addEventListener('characteristicvaluechanged', listener)
		).catch(
			error => alert(error)
		);
	}

	/**
		Request to read data
		@param	{function(ArrayBuffer)} completionHandler - a completion handler
	*/
	readData(completionHandler) {
		this._target.readValue().then(
			// ArrayBuffer
			data => completionHandler(data)
		).catch(
			error => alert(error)
		);
	}

	/**
		Request to read text
		@param	{function(String)} completionHandler - a completion handler
	*/
	readText(completionHandler) {
		this._target.readValue().then(
			// ArrayBuffer
			data => {
				const decoder = new TextDecoder();
				const text = decoder.decode(data);
				completionHandler(text);
			}
		).catch(
			error => alert(error)
		);
	}

	/**
		Write data
		@param	{ArrayBuffer} data
		@param	{function()} completionHandler - a completion handler or undefined
	*/
	writeData(data, completionHandler) {
		this._target.writeValue(data).then(
			() => {
				if (completionHandler) {
					completionHandler();
				}
			}
		).catch(
			error => alert(error)
		);
	}

	/**
		Write text
		@param	{String} text
		@param	{function()} completionHandler - a completion handler or undefined
	*/
	writeText(text, completionHandler) {
		let length = text.length;
		if (length > 0) {
			const encoder = new TextEncoder();
			this._target.writeValue(encoder.encode(text)).then(
				() => {
					if (completionHandler) {
						completionHandler();
					}
				}
			).catch(
				error => alert(error)
			);
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
let gConnectButton = new Button('id_button_connect');

/**
	Disconnect button
	@var	{Button}
*/
let gDisconnectButton = new Button('id_button_disconnect');

/**
	Clear LED Matrix button
	@var	{Button}
*/
let gClearLedMatrixButton = new Button('id_button_clear_led_matrix');

/**
	Refresh LED Matrix button
	@var	{Button}
*/
let gRefreshLedMatrixButton = new Button('id_button_refresh_led_matrix');

/**
	Show LED Message button
	@var	{Button}
*/
let gShowLedMessageButton = new Button('id_button_show_led_message');

/**
	Send UART Request button
	@var	{Button}
*/
let gSendUartRequestButton = new Button('id_button_send_uart_request');

/**
	Start Test Scenario button
	@var	{Button}
*/
let gStartTestScenarioButton = new Button('id_button_start_test_scenario');

/**
	Cancel Test Scenario button
	@var	{Button}
*/
let gCancelTestScenarioButton = new Button('id_button_cancel_test_scenario');

/**
	Conection Status field
	@var	{TextArea}
*/
let gConnectionStatusTextArea = new TextArea('id_input_text_connection_status');

/**
	Model Number field
	@var	{TextArea}
*/
let gModelNumberTextArea = new TextArea('id_input_text_model_number');

/**
	Firmware Revision field
	@var	{TextArea}
*/
let gFirmwareRevisionTextArea = new TextArea('id_input_text_firmware_revision');

/**
	Button Status field
	@var	{TextArea}
*/
let gButtonStatusTextArea = new TextArea('id_input_text_button_status');

/**
	Led Matrix field
	@var	{TextArea}
*/
let gLedMatrixTextArea = new TextArea('id_textarea_led_matrix');

/**
	Message field
	@var	{TextArea}
*/
let gLedMessageTextArea = new TextArea('id_input_text_led_message');

/**
	Request field
	@var	{TextArea}
*/
let gUartRequestTextArea = new TextArea('id_input_text_uart_request');

/**
	Response field
	@var	{TextArea}
*/
let gUartResponseTextArea = new TextArea('id_input_text_uart_response');

/**
	Response field
	@var	{TextArea}
*/
let gTestStepTextArea = new TextArea('id_input_text_test_step');

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
	The Bluetooth device filter.
	Used for `filters` of `navigator.bluetooth.requestDevice()`.
	@namespace	sBtDeviceFilter
*/
const sBtDeviceFilter = {
	/**
		Device name prefix
	*/
	namePrefix: 'BBC micro:bit'	// e.g., 'BBC micro:bit [vagip]'
};

/**
	The list of Bluetooth GATT service uuid.
	Used for `optionalServices` of `navigator.bluetooth.requestDevice()`.
	@var	{Array(UUID)}
*/
const sBtgServiceUuidList = [
	MicroBit.DeviceInformation.kService,
	MicroBit.ButtonService.kService,
	MicroBit.LedService.kService,
	MicroBit.UartService.kService
];

/**
	The list of Bluetooth GATT characteristic uuid for each service of {@link sBtgServiceUuidList}.
	@var	{Array(Array(UUID))}
*/
const sBtgCharacteristicUuidList = [
	[
		MicroBit.DeviceInformation.kModelNumberString,
		/*
		MicroBit.DeviceInformation.kSerialNumberString,
		*/
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
//	Global constants
// ------------------------------------------------------------

/**
	micro:bit LED's scrolling delay in milliseconds.
	@var	{Number}
*/
const kMicroBitLedScrollingDelayInMilliseconds = 100;

// ------------------------------------------------------------
//	Implementation for preparation
// ------------------------------------------------------------

/**
	Handle Window Opened
*/
function handleWindowOpened() {
	gConnectButton.addClickEventListener(onClickConnectButton);
	gDisconnectButton.addClickEventListener(onClickDisconnectButton);
	gClearLedMatrixButton.addClickEventListener(onClickClearLedMatrixButton);
	gRefreshLedMatrixButton.addClickEventListener(onClickRefreshLedMatrixButton);
	gShowLedMessageButton.addClickEventListener(onClickShowLedMessageButton);
	gSendUartRequestButton.addClickEventListener(onClickSendUartRequestButton);
	gStartTestScenarioButton.addClickEventListener(onClickStartTestScenarioButton);
	gCancelTestScenarioButton.addClickEventListener(onClickCancelTestScenarioButton);
}

/**
	Handle Connected
*/
function handleConnected() {
	retrieveDeviceInformation();
	retrieveLedMatrix();
	setScrollingDelay();
	observeButtons();
	observeUart();
}

// ------------------------------------------------------------
//	Implementation for window events
// ------------------------------------------------------------

/**
	On Load Window
*/
function onLoadWindow() {
	window.onbeforeunload = onBeforeUnloadWindow;
	handleWindowOpened();
}

/**
	On Before Unload Window
*/
function onBeforeUnloadWindow() {
	if (gBtDevice && gBtDevice.gatt.connected) {
		gBtDevice.gatt.disconnect();
	}
}

// ------------------------------------------------------------
//	Implementation for Bluetooth connection
// ------------------------------------------------------------

/**
	On Click Connect Button
*/
function onClickConnectButton() {
	if (!navigator.bluetooth) {
		alert(`Web Bluetooth is not available on this browser.`);
		return;
	}

	gConnectionStatusTextArea.text = 'Connecting...';
	navigator.bluetooth.requestDevice(
		{
			filters: [sBtDeviceFilter],
			optionalServices: sBtgServiceUuidList
		}
	).then(
		// BluetoothDevice
		device => {
			gBtDevice = device;
			return device.gatt.connect();
		}
	).then(
		// BluetoothRemoteGATTServer
		server => {
			gBtgServer = new BtgServer(gBtDevice, server, sBtgServiceUuidList);
			return Promise.all(gBtgServer.getPrimaryServices());
		}
	).then(
		// [BluetoothRemoteGATTService]
		services => {
			BtgService.registerServices(gBtgServer, services, sBtgCharacteristicUuidList);
			return Promise.all(gBtgServer.getCharacteristics());
		}
	).then(
		// [BluetoothRemoteGATTCharacteristic]
		characteristics => {
			BtgCharacteristic.registerCharacteristics(gBtgServer, characteristics);
			handleConnected();
			gConnectionStatusTextArea.text = 'Connected';
		}
	).catch(
		error => {
			gConnectionStatusTextArea.text = 'Connection Failed';	// this update is suspended while the modal alert below is active
			alert(error);
		}
	);
}

/**
	On Click Disconnect Button
*/
function onClickDisconnectButton() {
	if (gBtDevice && gBtDevice.gatt.connected) {
		gBtDevice.gatt.disconnect();
		if (gBtDevice.gatt.connected) {
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

/**
	Retrieve Device Information
*/
function retrieveDeviceInformation() {
	let characteristic = gBtgServer.getCharacteristic(MicroBit.DeviceInformation.kModelNumberString);
	if (characteristic) {
		characteristic.readText(
			text => gModelNumberTextArea.text = text
		);
	}
	characteristic = gBtgServer.getCharacteristic(MicroBit.DeviceInformation.kFirmwareRevisionString);
	if (characteristic) {
		characteristic.readText(
			text => gFirmwareRevisionTextArea.text = text
		);
	}
}

// ------------------------------------------------------------
//	Implementation for micro:bit's Button Service
// ------------------------------------------------------------

/**
	Observe Buttons
*/
function observeButtons() {
	let characteristic;
	characteristic = gBtgServer.getCharacteristic(MicroBit.ButtonService.kButtonAState);
	if (characteristic) {
		characteristic.addValueChangedEventListener(
			event => {
				let value = event.target.value.getUint8(0);
				if (value == 1) {
					gButtonStatusTextArea.text = 'Button A Pressed';
				}
				else if (value == 2) {
					gButtonStatusTextArea.text = 'Button A Long Pressed';
				}
				else {
					gButtonStatusTextArea.text = '';
				}
			}
		);
	}
	characteristic = gBtgServer.getCharacteristic(MicroBit.ButtonService.kButtonBState);
	if (characteristic) {
		characteristic.addValueChangedEventListener(
			event => {
				let value = event.target.value.getUint8(0);
				if (value == 1) {
					gButtonStatusTextArea.text = 'Button B Pressed';
				}
				else if (value == 2) {
					gButtonStatusTextArea.text = 'Button B Long Pressed';
				}
				else {
					gButtonStatusTextArea.text = '';
				}
			}
		);
	}
}

// ------------------------------------------------------------
//	Implementation for micro:bit's LED Service
// ------------------------------------------------------------

/**
	LED Matrix Data for Blank
	@var	{TypedArray}
*/
const sLedMatrixBlank = Uint8Array.of(
	0x00,	//	- - - - -
	0x00,	//	- - - - -
	0x00,	//	- - - - -
	0x00,	//	- - - - -
	0x00	//	- - - - -
);

/**
	LED Matrix Data for Check Mark
	@var	{TypedArray}
*/
const sLedMatrixCheckMark = Uint8Array.of(
	0x00,	//	- - - - -
	0x01,	//	- - - - X
	0x02,	//	- - - X -
	0x14,	//	X - X - -
	0x08	//	- X - - -
);

/**
	LED Matrix State
	@var	{TypedArray}
*/
const gLedMatrixState = new Uint8Array(5);


/**
	Are Typed Arrays Equal
	@param	{TypedArray} a
	@param	{TypedArray} b
	@returns	{Boolean}
*/
function areTypedArraysEqual(a, b) {
	if (a.byteLength !== b.byteLength) {
		return false;
	}
	return a.every((val, i) => val === b[i]);
}

/**
	Retrieve LED Matrix
*/
function retrieveLedMatrix() {
	const characteristic = gBtgServer.getCharacteristic(MicroBit.LedService.kLedMatrixState);
	if (characteristic) {
		characteristic.readData(
			data => {
				if (!data || data.byteLength != 5) {
					return;
				}
				let text = '';
				let i;
				for (i = 0; i < 5; i++) {
					if (text != '') {
						text += '\n';
					}
					let row = data.getUint8(i);
					text += charForLedPixel(row & 0x10);
					text += charForLedPixel(row & 0x08);
					text += charForLedPixel(row & 0x04);
					text += charForLedPixel(row & 0x02);
					text += charForLedPixel(row & 0x01);
					gLedMatrixState[i] = row;
				}
				gLedMatrixTextArea.text = text;
			}
		);
	}
}

/**
	Char For Led Pixel
*/
function charForLedPixel(value) {
	return value ? '■' : '□';
}

/**
	Set Scrolling Delay for LED
*/
function setScrollingDelay() {
	const characteristic = gBtgServer.getCharacteristic(MicroBit.LedService.kScrollingDelay);
	if (!characteristic) {
		return;
	}
	//	use platform's endianness as
	//		let data = Uint16Array.of(kMicroBitLedScrollingDelayInMilliseconds);
	//	or use little endian explicitly
	let data = new DataView(new ArrayBuffer(2));
	data.setUint16(0, kMicroBitLedScrollingDelayInMilliseconds, true);
	characteristic.writeData(data);
}

/**
	Show LED Matrix
	@param	{ArrayBuffer} data - LED Matrix Data
*/
function showLedMatrix(data) {
	const characteristic = gBtgServer.getCharacteristic(MicroBit.LedService.kLedMatrixState);
	if (!characteristic) {
		return;
	}
	try {
		characteristic.writeData(
			data,
			() => retrieveLedMatrix()
		);
	}
	catch (error) {
		alert(error);
	}
}

/**
	On Click Clear LED Matrix Button
*/
function onClickClearLedMatrixButton() {
	showLedMatrix(sLedMatrixBlank);
}

/**
	On Refresh Led Matrix Button
*/
function onClickRefreshLedMatrixButton() {
	retrieveLedMatrix();
}

/**
	On Click Show LED Message Button
*/
function onClickShowLedMessageButton() {
	const characteristic = gBtgServer.getCharacteristic(MicroBit.LedService.kLedText);
	if (!characteristic) {
		return;
	}
	try {
		const text = gLedMessageTextArea.text;
		const length = text.length;
		if (length > 0) {
			characteristic.writeText(text);
			setTimeout(
				() => showLedMatrix(sLedMatrixCheckMark),
				kMicroBitLedScrollingDelayInMilliseconds * 6 * (length + 2)
			);
		}
	}
	catch (error) {
		alert(error);
	}
}

// ------------------------------------------------------------
//	Implementation for micro:bit's UART Service
// ------------------------------------------------------------

/**
	Observe UART
*/
function observeUart() {
	const characteristic = gBtgServer.getCharacteristic(MicroBit.UartService.kTxCharacteristic);
	if (characteristic) {
		characteristic.addValueChangedEventListener(
			event => {
				const data = event.target.value;
				const decoder = new TextDecoder();
				const text = decoder.decode(data);
				gUartResponseTextArea.text = text;
				retrieveLedMatrix();
			}
		);
	}
}

/**
	On Click Send Request Button
*/
function onClickSendUartRequestButton() {
	const characteristic = gBtgServer.getCharacteristic(MicroBit.UartService.kRxCharacteristic);
	if (characteristic) {
		try {
			/*
			let data = Uint8Array.of(0x4a, 0x42, 0x3A);
			characteristic.writeData(data);
			*/
			let text = gUartRequestTextArea.text;
			const length = text.length;
			if (length > 0) {
				text += '\n';
				characteristic.writeText(text);
			}
		}
		catch (error) {
			alert(error);
		}
	}
}

// ------------------------------------------------------------
//	Implementation for test scenario
// ------------------------------------------------------------

/**
	Test Scenario
*/
const sTestScenario = [
	{
		condition: () => true,
		guide: 'Press Connect button and choose a micro:bit to connect.'
	},
	{
		condition: () => gConnectionStatusTextArea.text == 'Connected',
		guide: 'Depress button A on the connected micro:bit.'
	},
	{
		condition: () => gButtonStatusTextArea.text == 'Button A Pressed',
		guide: 'Hold button A on the connected micro:bit.'
	},
	{
		condition: () => gButtonStatusTextArea.text == 'Button A Long Pressed',
		guide: 'Release button A on the connected micro:bit.'
	},
	{
		condition: () => gButtonStatusTextArea.text == '',
		guide: 'Depress button B on the connected micro:bit.'
	},
	{
		condition: () => gButtonStatusTextArea.text == 'Button B Pressed',
		guide: 'Hold button B on the connected micro:bit.'
	},
	{
		condition: () => gButtonStatusTextArea.text == 'Button B Long Pressed',
		guide: 'Release button B on the connected micro:bit.'
	},
	{
		condition: () => gButtonStatusTextArea.text == '',
		guide: 'Press LED Matrix Clear button.'
	},
	{
		condition: () => areTypedArraysEqual(gLedMatrixState, sLedMatrixBlank),
		guide: 'Type text in LED Message field and then press Show button.'
	},
	{
		condition: () => areTypedArraysEqual(gLedMatrixState, sLedMatrixCheckMark),
		guide: 'Press LED Matrix Clear button.'
	},
	{
		condition: () => areTypedArraysEqual(gLedMatrixState, sLedMatrixBlank),
		guide: 'Type text in UART Request field and then press Send button.'
	},
	{
		condition: () => areTypedArraysEqual(gLedMatrixState, sLedMatrixCheckMark),
		guide: 'Completed'
	}
];

/**
	Test Step Number
*/
let gTestStep = -1;

/**
	Test Scenario Timer ID or "off"
*/
let gTestScenarioTimer = "off";

/**
	On Click Start Test Scenario Button
*/
function onClickStartTestScenarioButton() {
	if (gTestStep < 0) {
		startTestScenario();
	}
}

/**
	On Click Cancel Test Scenario Button
*/
function onClickCancelTestScenarioButton() {
	if (0 <= gTestStep) {
		gTestStepTextArea.text = 'Canceled.';
		stopTestScenario();
	}
}

/**
	Start Test Scenario
*/
function startTestScenario() {
	gTestStep = 0;
	cancelIntervalTimer();
	maintainTestScenario();
	startIntervalTimer();
}

/**
	Stop Test Scenario
*/
function stopTestScenario() {
	cancelIntervalTimer();
	gTestStep = -1;
}

/**
	Start Interval Timer
*/
function startIntervalTimer() {
	gTestScenarioTimer = setInterval(maintainTestScenario, 1000);
}

/**
	Cancel Interval Timer
*/
function cancelIntervalTimer() {
	if (gTestScenarioTimer != "off") {
		clearInterval(gTestScenarioTimer);
		gTestScenarioTimer = "off";
	}
}

/**
	Maintain Test Scenario
*/
function maintainTestScenario() {
	if ((0 <= gTestStep) && (gTestStep < sTestScenario.length)) {
		if (!(sTestScenario[gTestStep].condition)()) {
			// wait for the condition
			return;
		}

		// show the guide
		gTestStepTextArea.text =
			(gTestStep + 1).toString() + '. ' + sTestScenario[gTestStep].guide;

		gTestStep++;
		if (gTestStep < sTestScenario.length) {
			// go to the next step
			return;
		}
	}
	stopTestScenario();
}

// ------------------------------------------------------------
//	Implementation for main
// ------------------------------------------------------------

/**
	main
*/
function main() {
	window.onload = onLoadWindow;
}

main();

// ------------------------------------------------------------
