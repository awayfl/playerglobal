import { ASObject, axCoerceString } from '@awayfl/avm2';
import { FrameLabel } from './FrameLabel';

export class Scene extends ASObject {

	public static classInitializer: any = null;
	public static classSymbols: string [] = null; // [];
	public static instanceSymbols: string [] = null;

	constructor (name: string, labels: {value: FrameLabel[]}, offset: number, numFrames: number /*int*/) {
		super();
		this._name = axCoerceString(name);
		// Note: creating Scene objects in ActionScript, while possible, is undocumented and entirely
		// useless. Luckily, that also means that they're not very carefully implemented.
		// Specifically, the `labels` array isn't cloned during construction or when returned from
		// the getter. I.e., it can be modified freely.
		this._labels = labels;
		this.offset = offset;
		this._numFrames = numFrames | 0;
	}

	private _name: string;
	private offset: number;
	private _numFrames: number /*int*/;
	private _labels: {value: FrameLabel[]};

	public get name(): string {
		return this._name;
	}

	public get labels(): {value: FrameLabel[]} {
		return this._labels;
	}

	public get numFrames(): number {
		return this._numFrames;
	}

	public clone(): Scene {
		const labels_ = this._labels.value.map(function (label: FrameLabel) { return label.clone(); });
		return new Scene(this._name, this.sec.createArrayUnsafe(labels_),
			this.offset, this._numFrames);
	}

	public getLabelByName(name: string, ignoreCase: boolean): FrameLabel {
		if (ignoreCase) {
			name = name.toLowerCase();
		}
		const labels = this._labels.value;
		for (let i = 0; i < labels.length; i++) {
			const label = labels[i];
			if (ignoreCase ? label.name.toLowerCase() === name : label.name === name) {
				return label;
			}
		}
		return null;
	}

	public getLabelByFrame(frame: number): FrameLabel {
		const labels = this._labels.value;
		for (let i = 0; i < labels.length; i++) {
			const label = labels[i];
			if (label.frame === frame) {
				return label;
			}
		}
		return null;
	}
}