import { Component, ComponentInterface, Element, Event, EventEmitter, Host, Prop, h } from '@stencil/core';

import { getIonMode } from '../../global/ionic-global';

@Component({
  tag: 'ion-select-option',
  shadow: true,
  styleUrl: 'select-option.scss'
})
export class SelectOption implements ComponentInterface {

  private inputId = `ion-selopt-${selectOptionIds++}`;

  @Element() el!: HTMLElement;

  /**
   * If `true`, the user cannot interact with the select option.
   */
  @Prop() disabled = false;

  /**
   * If `true`, the element is selected.
   */
  @Prop() selected = false;

  /**
   * The text value of the option.
   */
  @Prop({ mutable: true }) value?: any | null;

  /**
   * Additional classes to apply for custom CSS. If multiple classes are
   * provided they should be separated by spaces.
   */
  @Prop({ mutable: true, reflectToAttr: true, attr: 'class' }) customCssClass?: string | { [className: string]: boolean; } | undefined;

  /**
   * Emitted when the select option loads.
   * @internal
   */
  @Event() ionSelectOptionDidLoad!: EventEmitter<void>;

  /**
   * Emitted when the select option unloads.
   * @internal
   */
  @Event() ionSelectOptionDidUnload!: EventEmitter<void>;

  componentWillLoad() {
    if (this.value === undefined) {
      this.value = this.el.textContent || '';
    }
  }

  componentDidLoad() {
    this.ionSelectOptionDidLoad.emit();
  }

  componentDidUnload() {
    this.ionSelectOptionDidUnload.emit();
  }

  render() {
    return (
      <Host
        role="option"
        id={this.inputId}
        class={getIonMode(this)}
      >
      </Host>
    );
  }
}

let selectOptionIds = 0;
