export const light = {

}

export const medium = {
}

export const dark = {
}

export const lights = [
]

export const mediums = [
	'#4D4D4D', '#5DA5DA', '#FAA43A', '#60BD68', '#F17CB0', '#B2912F', '#B276B2', '#DECF3F', '#F15854'
]
//moved gray types to end
export const mediumsNotGray = [
	'#5DA5DA', '#FAA43A', '#60BD68', '#F17CB0', '#B2912F', '#B276B2', 
	'#DECF3F', '#F15854', /*similar to gray*/'#4D4D4D'
]

export const darks = [
]

export const graysDarkToLight = [
	'#000000', '#696969', '#808080', '#A9A9A9', '#C0C0C0'
]
//for 3, the first 3 are spread out, the next 2 are inbetween the others
export const graysDarkToLight3 = [
	'#000000', '#808080', '#C0C0C0', /*2 extra just in case*/ '#696969', '#A9A9A9',
]
export const graysLightToDark3 = [
	//1st one '#C0C0C0' is too light
	/*need another at start here lighter than 808080 but darker than c0c0c0*/
	'#a6a6a6', '#808080', '#000000', '#696969', /*1 extra just in case*/'#A9A9A9',
]
export const graysLightToDark = [
	'#C0C0C0', '#A9A9A9', '#808080', '#696969', '#000000'
]