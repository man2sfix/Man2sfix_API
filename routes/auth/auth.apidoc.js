/**
 * @api {post} /auth 회원 로그인
 * @apiName MemberLogin
 * @apiGroup Auth
 *
 * @apiParam {number} mem_userid 회원 아이디
 * @apiParam {String} mem_pw 회원 비밀번호
 *
 * @apiSuccess {Boolean} isValid 유효 여부
 * @apiSuccess {String} token_type 토큰 타입
 * @apiSuccess {String} access_token 토큰 값
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 Ok
 *     {
 *       "isValid": true,
 *       "token_type": "bearer",
 *       "access_token": "token value"
 *     }
 *
 * @apiError BadRequest 잘못된 요청
 * @apiError Unauthorized 인증 만료 혹은 잘못된 인증으로 요청
 * @apiError NotFound 잘못된 경로 요청
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Requset
 *     {
 *       "status": 400,
 *       "message": "Bad Request"
 *     }
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "status": 401,
 *       "message": "Unauthorized"
 *     }
 *     HTTP/1.1 404 Not Found
 *     {
 *       "status": 404,
 *       "error": "Not Found"
 *     }
 *
 */
