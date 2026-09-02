import { ASObject, axCoerceString, Int32Vector, Float64Vector } from '@awayfl/avm2';
import { GraphicsPathCommand } from '@awayjs/graphics';
import { IGraphicsData, IGraphicsPath } from './IGraphicsData';

/**
 * AS3 GraphicsPath: commands Vector.<int>, data Vector.<Number>, winding,
 * plus moveTo/lineTo/curveTo/cubicCurveTo/wideMoveTo/wideLineTo.
 */
export class GraphicsPath extends ASObject implements IGraphicsData, IGraphicsPath {

	public static classInitializer: any = null;

	public commands: Int32Vector;
	public data: Float64Vector;
	public winding: string;

	constructor(
		commands: Int32Vector = null,
		data: Float64Vector = null,
		winding: string = 'evenOdd') {
		super();
		this.commands = commands;
		this.data = data;
		this.winding = axCoerceString(winding) || 'evenOdd';
	}

	public moveTo(x: number, y: number): void {
		this._ensureLists();
		this._pushCommand(GraphicsPathCommand.MOVE_TO, x, y);
	}

	public lineTo(x: number, y: number): void {
		this._ensureLists();
		this._pushCommand(GraphicsPathCommand.LINE_TO, x, y);
	}

	public curveTo(controlX: number, controlY: number, anchorX: number, anchorY: number): void {
		this._ensureLists();
		this._pushCommand(GraphicsPathCommand.CURVE_TO, controlX, controlY, anchorX, anchorY);
	}

	public cubicCurveTo(
		controlX1: number, controlY1: number,
		controlX2: number, controlY2: number,
		anchorX: number, anchorY: number): void {
		this._ensureLists();
		this._pushCommand(
			GraphicsPathCommand.CUBIC_CURVE,
			controlX1, controlY1, controlX2, controlY2, anchorX, anchorY);
	}

	public wideMoveTo(x: number, y: number): void {
		this._ensureLists();
		this._pushCommand(GraphicsPathCommand.WIDE_MOVE_TO, 0, 0, x, y);
	}

	public wideLineTo(x: number, y: number): void {
		this._ensureLists();
		this._pushCommand(GraphicsPathCommand.WIDE_LINE_TO, 0, 0, x, y);
	}

	private _ensureLists(): void {
		if (!this.commands)
			this.commands = new this.sec.Int32Vector();
		if (!this.data)
			this.data = new this.sec.Float64Vector();
	}

	private _pushCommand(command: number, ...coords: number[]): void {
		GraphicsPath._pushNumeric(this.commands, command);
		for (let i = 0; i < coords.length; i++)
			GraphicsPath._pushNumeric(this.data, coords[i]);
	}

	public static _pushNumeric(vector: any, value: number): void {
		if (!vector)
			return;
		if (typeof vector.axSetNumericProperty === 'function') {
			vector.axSetNumericProperty(vector.length, value);
			return;
		}
		if (typeof vector.push === 'function') {
			vector.push(value);
			return;
		}
		vector[vector.length] = value;
	}
}
