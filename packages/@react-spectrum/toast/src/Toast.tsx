/*************************************************************************
* ADOBE CONFIDENTIAL
* ___________________
*
* Copyright 2019 Adobe
* All Rights Reserved.
*
* NOTICE: All information contained herein is, and remains
* the property of Adobe and its suppliers, if any. The intellectual
* and technical concepts contained herein are proprietary to Adobe
* and its suppliers and are protected by all applicable intellectual
* property laws, including trade secret and copyright laws.
* Dissemination of this information or reproduction of this material
* is strictly forbidden unless prior written permission is obtained
* from Adobe.
**************************************************************************/

import {Button, ClearButton} from '@react-spectrum/button';
import {classNames, filterDOMProps, ICON_VARIANTS} from '@react-spectrum/utils';
import CrossMedium from '@spectrum-icons/ui/CrossMedium';
import {HTMLElement} from 'react-dom';
import React, {RefObject} from 'react';
import styles from '@adobe/spectrum-css-temp/components/toast/vars.css';
import {ToastProps} from '@react-types/toast';
import {useProviderProps} from '@react-spectrum/provider';
import {useToast} from '@react-aria/toast';

export const Toast = React.forwardRef((props: ToastProps, ref: RefObject<HTMLElement>) => {
  let defaults = {};
  let completeProps = Object.assign({}, defaults, useProviderProps(props));
  let ariaProps = useToast(completeProps);

  let {
    actionLabel,
    children,
    className,
    variant,
    ...otherProps
  } = completeProps;
  let Icon = ICON_VARIANTS[variant];

  return (
    <div
      {...filterDOMProps(otherProps)}
      {...ariaProps.toastProps}
      ref={ref}
      className={classNames(styles,
        'spectrum-Toast',
        {['spectrum-Toast--' + variant]: variant},
        className
      )}>
      {Icon &&
        <Icon
          {...ariaProps.iconProps}
          size={null}
          className={classNames(styles, 'spectrum-Toast-typeIcon')} />
      }
      <div className={classNames(styles, 'spectrum-Toast-body')}>
        <div className={classNames(styles, 'spectrum-Toast-content')}>{children}</div>
        {actionLabel &&
          <Button
            {...ariaProps.actionButtonProps}
            isQuiet
            variant="overBackground">{actionLabel}</Button>
        }
      </div>
      <div className={classNames(styles, 'spectrum-Toast-buttons')}>
        <ClearButton {...ariaProps.closeButtonProps} variant="overBackground">
          <CrossMedium size={null} />
        </ClearButton>
      </div>
    </div>
  );
});