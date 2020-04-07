import { ASObject } from "../../avm2/nat/ASObject";

/**
 * Copyright 2014 Mozilla Foundation
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 * http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// Class: EventPhase
export class EventPhase extends ASObject {

  static classInitializer: any = null;

  static classSymbols: string [] = null;
  static instanceSymbols: string [] = null;
  
  constructor () {
    super();
  }
  
  // JS -> AS Bindings
  static CAPTURING_PHASE: number /*uint*/ = 1;
  static AT_TARGET: number /*uint*/ = 2;
  static BUBBLING_PHASE: number /*uint*/ = 3;
}