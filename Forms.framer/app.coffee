{InputField} = require 'InputField'
#Resolution Calc.#
screen_width = Framer.Device.screen.width
screen_height = Framer.Device.screen.height
default_w = 360
default_h = 640
ratio = screen_width / default_w
Framer.Device.contentScale = ratio

#Colors#
mediumGrey = "#6f6f75"

darkGrey = "#35383D"

lightGrey = "#EBEBEB"

errors = "#E24844"

darkGreen = "#4c753f"

mediumGreen = "#7A9C64"






class Form extends Layer
	constructor: (options) ->
 
		# Get default layer functionality 
		super _.defaults options,
		# Set default properties 
		width: 312
		height: 72
		x: 24
		backgroundColor: "white"
		
		rule = new Layer
			parent: @

		rule.states.focused = 
			scale: 2
			backgroundColor: mediumGreen

		rule.states.unfocused = 
			scale: 1
			backgroundColor: lightGrey
		
		label = new Layer

		label.states.focused =
			x: 0
			y: 0
			fontSize: 12
			color: mediumGrey
			options:
				curve: Bezier.ease
				time: 0.35

		label.states.unfocused =
			y: 16
			fontSize: 16
			color: mediumGrey

		label.states.empty = label.states.unfocused
		label.states.filled = label.states.focused
		
		hint.states.unfocused = 
			visible: false
	
		hint.states.focused = 
			visible: true
		
		inputText = new InputField
			parent: input_frame
			type: "text"
			height: $input_.height
			width: $input_.width
			x: 0
			y: 0
			fontSize: $input_.fontSize*ratio
			fontFamily: $input_.fontFamily
			lineHeight: null
			color: darkGrey
		
		input_frame.states.focused = 
			visible: true
			
		input_frame.states.empty = 
			visible: false
			
		focusForm = (focus, fill) ->
			rule.animate(focus)
			label.animate(focus)
			input_frame.stateSwitch(focus)
			hint.stateSwitch(focus)
		
		Form.onClick ->
			focusForm("focused")