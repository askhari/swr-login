import * as core from '@actions/core';
import * as context from './context';

import * as huaweicore from '@huaweicloud/huaweicloud-sdk-core';
import * as swr from '@huaweicloud/huaweicloud-sdk-swr';

/**
 * 获取swr临时登录指令
 * @param
 * @returns
 */
export async function createSecret(inputs: context.Inputs): Promise<string> {
    const credentials = new huaweicore.BasicCredentials()
        .withAk(inputs.accessKey)
        .withSk(inputs.secretKey);
    const client = swr.SwrClient.newBuilder()
        .withCredential(credentials)
        .withEndpoint(`https://swr-api.${inputs.region}.${inputs.location}`)
        .withOptions({customUserAgent: context.CUSTOM_USER_AGENT})
        .build();
    const request = new swr.CreateSecretRequest();
    request.projectname = inputs.region;
    try {
        const result = await client.createSecret(request);
        if (result.httpStatusCode !== 200) {
            core.setFailed('Get SWR Secret Request Failed.');
        }
        return JSON.stringify({auths: result.auths});
    } catch (error) {
        throw new Error('Get SWR Secret Failed.');
    }
}
