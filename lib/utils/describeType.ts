
/**
 * Produces an XML object that describes the ActionScript object named as the parameter of
 * the method. This method implements the programming concept of reflection for the
 * ActionScript language.
 * If the value parameter is an instance of a type, the returned XML object includes all
 * the instance properties of that type,
 * but does not include any static properties.
 * You can check for this condition when you parse the XML object by examining
 * the value of the <type> tag's isStatic attribute, which is false when the value
 * parameter is an instance of a type.To obtain the static properties of a type,
 * pass the type itself for the value parameter.
 * The returned XML object includes not only the type's static properties,
 * but also all of its instance properties.
 * The instance properties are nested inside a tag named <factory> to distinguish them from the static properties.
 * In this case, the isStatic attribute of the <type> tag is true.
 * Note: If you need only to traverse an object's inheritance hierarchy
 * and do not need the other information provided by describeType(),
 * use the getQualifiedClassName() and getQualifiedSuperclassName() functions instead.
 * The following table describes some of the tags and attributes of the XML object generated by describeType()
 * (all class and interface names returned are in fully qualified format):
 * TagAttributeDescription<type> The root tag of the XML object.name
 * The name of the ActionScript object's data type.baseThe immediate superclass
 * of the ActionScript object's defining class.
 * If the ActionScript object is a class object, the value is Class.
 * isDynamictrue if the ActionScript object's defining class is dynamic;
 * false otherwise. If the ActionScript object is a class object,
 * the value is true because the Class class is dynamic.
 * isFinaltrue if the ActionScript object's defining class is final;
 * false otherwise. isStatictrue if the ActionScript object is a class object or constructor function;
 * false otherwise. This attribute is named isStatic because if it is true,
 * any tags that are not nested inside the factory tag are static.<extendsClass>
 * There is a separate extendsClass tag for each superclass of the ActionScript object's defining class.type
 * The name of a superclass that the ActionScript object's defining class extends.<implementsInterface>
 * There is a separate implementsInterface tag for each interface implemented by the ActionScript object's
 * defining class or any of its superclasses.type
 * The name of an interface that the ActionScript object's defining class implements.<accessor>
 * An accessor is a property defined by getter and setter functions.nameThe name of the accessor.access
 * The access rights of the property. Possible values include readonly, writeonly, and readwrite. type
 * The data type of the property. declaredByThe class that contains the associated getter or setter functions.<constant>
 * A constant is a property defined with the const statement. name
 * The name of the constant. typeThe data type of the constant.<method>
 * A method is a function declared as part of a class definition.name
 * The name of the method. eclared By
 * The class that contains the method definition. returnType
 * The data type of the method's return value.<parameter>
 * There is a separate parameter tag for each parameter that a method defines.
 * This tag is always nested inside a <method> tag. index
 * A number corresponding to the order in which the parameter appears in the method's parameter list.
 * The first parameter has a value of 1. type
 * The data type of the parameter. optionaltrue if the parameter is optional;
 * false otherwise.<variable> A variable is a property defined with the var statement. name
 * The name of the variable. typeThe data type of the variable.<factory>
 * If the ActionScript object is a class object or constructor function,
 * all instance properties and methods are nested inside this tag. If the is
 * Static attribute of the <type> tag is true, all properties and methods that are not
 *  nested within the <factory> tag are static.
 * This tag appears only if the ActionScript object is a class object or constructor function.
 * @param	value	The object for which a type description is desired. Any ActionScript value
 * may be passed to this method including all available ActionScript types, object
 * instances, primitive types such as uint, and class objects.
 * @return	An XML object containing details about the object that was passed in as a parameter.
 *   It provides the following information about the object:
 *
 * The class of the objectThe attributes of the class
 * The inheritance tree from the class to its base classes
 * The interfaces implemented by the class
 * The declared instance properties of the class
 * The declared static properties of the classT
 * he instance methods of the class
 * The static methods of the class For each method of the class, the name, number of parameters, return type,
 * and parameter types Note:describeType() only shows public properties and methods, and will not show
 * properties and methods that are private, package internal or in custom namespaces.
 * @langversion	3.0
 * @playerversion	Flash 9
 * @playerversion	Lite 4
 */
export const describeType = function(value: any): any {
	//todo: any is XML
	console.log('describeType is not implemented yet in flash/utils');
};