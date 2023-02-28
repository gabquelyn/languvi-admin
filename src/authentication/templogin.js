import AWS from "aws-sdk";
import sendResponse from "../../lib/sendResponse";
const UserPoolId = process.env.ADMIN_POOL_ID;
const ClientId = process.env.ADMIN_CLIENT_ID;
const cognito = new AWS.CognitoIdentityServiceProvider();
export async function login(event, context) {
  const { email, password, new_password} = JSON.parse(event.body);
  const params = {
    AuthFlow: "ADMIN_NO_SRP_AUTH",
    UserPoolId,
    ClientId,
    AuthParameters: {
      USERNAME: email,
      PASSWORD: password,
    },
  };

  const _params = {
    Password: new_password,
    UserPoolId,
    Username: email,
    Permanent: true
}

  try {
    const response = await cognito.adminInitiateAuth(params).promise();
    await cognito.adminSetUserPassword(_params).promise()
    return sendResponse(200, {
      message: "Success",
      token: response.Session,
    });
  } catch (err) {
    console.error(err);
    return sendResponse(501, {message: err.message})
  }
}

export const handler = login;
