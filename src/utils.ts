import * as core from '@actions/core';
import * as context from './context';

// 正则校验表达式
const ACCESS_KEY_REG = RegExp(/^[a-zA-Z0-9]{10,30}$/);
const SECRET_KEY_REG = RegExp(/^[a-zA-Z0-9]{30,50}$/);

const REGION_REG = RegExp(/^[a-zA-Z0-9]{1,5}-[a-zA-Z0-9]+-[0-9]{1,3}$/);
const LOCATION_REG = RegExp(/myhuaweicloud.com$|myhuaweicloud.eu$/);

/**
 * 检查每个inputs 属性value是否合法
 * @param inputs
 * @returns
 */
export function checkInputs(inputs: context.Inputs): boolean {
    if (!checkAkSk(inputs.accessKey, inputs.secretKey)) {
        core.info('ak or sk is not correct.');
        return false;
    }
    if (!checkRegion(inputs.region)) {
        core.info('region is not correct.');
        return false;
    }

    if (!checkLocation(inputs.location)) {
        core.info('location is not correct.');
        return false;
    }

    return true;
}

/**
 * 检查aksk是否合法
 * @param inputs
 * @returns
 */
export function checkAkSk(accessKey: string, secretKey: string): boolean {
    return ACCESS_KEY_REG.test(accessKey) && SECRET_KEY_REG.test(secretKey);
}

/**
 * 检查region格式是否合法
 * @returns
 */
export function checkRegion(region: string): boolean {
    return REGION_REG.test(region);
}

/**
 * Huawei Cloud Location
 * @returns
 */
export function checkLocation(location: string): boolean {
    return LOCATION_REG.test(location);
}
