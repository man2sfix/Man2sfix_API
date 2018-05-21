/**
 * @api {get} /member 전체 회원 조회
 * @apiName GetAllMember
 * @apiGroup Member
 *
 * @apiHeader {String} Authorization bearer token
 * @apiHeaderExample Request-Example:
 *     "Authorization": "bearer token"
 *
 * @apiParam {Number} start offset
 * @apiParam {Number} end limit
 *
 * @apiSuccess {Number} mem_id 회원 고유값
 * @apiSuccess {String} mem_userid 회원 아이디
 * @apiSuccess {String} mem_email 회원 이메일
 * @apiSuccess {String} mem_name 회원 이름
 * @apiSuccess {String} mem_profile_photo 회원 프로필 사진
 * @apiSuccess {String} mem_phone 회원 전화번호
 * @apiSuccess {Number} mem_mail_agree 회원 메일 수신 동의 (0: 동의X, 1: 동의)
 * @apiSuccess {Date} mem_create_date 회원 생성 날짜
 * @apiSuccess {Date} mem_last_connect_date 회원 마지막 접속 날짜
 * @apiSuccess {Date} mem_update 회원 업데이트
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 Ok
 *     {
 *        "count": 1,
 *        "rows": [
 *          {
 *            "mem_id": 1,
 *            "mem_userid": "test",
 *            "mem_email": "test@gmail.com",
 *            "mem_name": "tester",
 *            "mem_profile_photo": null,
 *            "mem_phone": "000-0000-0000",
 *            "mem_mail_agree": 1,
 *            "mem_create_date": "0000-00-00T00:00:00.000Z",
 *            "mem_last_connect_date": "0000-00-00T00:00:00.000Z",
 *            "mem_update": "0000-00-00T00:00:00.000Z"
 *          }
 *        ]
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


/**
 * @api {get} /member/:mem_id 특정 회원 조회
 * @apiName GetSpecificMember
 * @apiGroup Member
 *
 * @apiHeader {String} Authorization bearer token
 * @apiHeaderExample Request-Example:
 *     "Authorization": "bearer token"
 *
 * @apiParam {Number} mem_id 회원 고유값
 *
 * @apiSuccess {Number} mem_id 회원 고유값
 * @apiSuccess {String} mem_userid 회원 아이디
 * @apiSuccess {String} mem_email 회원 이메일
 * @apiSuccess {String} mem_name 회원 이름
 * @apiSuccess {String} mem_profile_photo 회원 프로필 사진
 * @apiSuccess {String} mem_phone 회원 전화번호
 * @apiSuccess {Number} mem_mail_agree 회원 메일 수신 동의 (0: 동의X, 1: 동의)
 * @apiSuccess {Date} mem_create_date 회원 생성 날짜
 * @apiSuccess {Date} mem_last_connect_date 회원 마지막 접속 날짜
 * @apiSuccess {Date} mem_update 회원 업데이트
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 Ok
 *     {
 *        "mem_id": 1,
 *        "mem_userid": "test",
 *        "mem_email": "test@gmail.com",
 *        "mem_name": "tester",
 *        "mem_profile_photo": null,
 *        "mem_phone": "000-0000-0000",
 *        "mem_mail_agree": 1,
 *        "mem_create_date": "0000-00-00T00:00:00.000Z",
 *        "mem_last_connect_date": "0000-00-00T00:00:00.000Z",
 *        "mem_update": "0000-00-00T00:00:00.000Z"
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


/**
 * @api {get} /member/userid/:userid 회원 아이디 조회
 * @apiName GetMmeberUserId
 * @apiGroup Member
 *
 * @apiHeader {String} Authorization bearer token
 * @apiHeaderExample Request-Example:
 *     "Authorization": "bearer token"
 *
 * @apiParam {String} userid 회원 아이디
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 Ok
 *     true
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 Ok
 *     false
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


/**
 * @api {get} /member/email/:email 회원 이메일 조회
 * @apiName GetMmeberEmail
 * @apiGroup Member
 *
 * @apiHeader {String} Authorization bearer token
 * @apiHeaderExample Request-Example:
 *     "Authorization": "bearer token"
 *
 * @apiParam {String} email 회원 이메일
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 Ok
 *     true
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 Ok
 *     false
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


/**
 * @api {delete} /member/:mem_id 회원 삭제
 * @apiName DeleteMember
 * @apiGroup Member
 *
 * @apiHeader {String} Authorization bearer token
 * @apiHeaderExample Request-Example:
 *     "Authorization": "bearer token"
 *
 * @apiParam {Number} mem_id 회원 고유값
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 Ok
 *     true
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


/**
 * @api {post} /member 회원 생성
 * @apiName CreateMember
 * @apiGroup Member
 *
 * @apiHeader {String} Authorization bearer token
 * @apiHeaderExample Request-Example:
 *     "Authorization": "bearer token"
 *
 * @apiParam {String} mem_userid 회원 이메일
 * @apiParam {String} mem_email 회원 이메일
 * @apiParam {String} mem_name 회원 이름
 * @apiParam {String} mem_pw 회원 비밀번호
 * @apiParam {String} mem_phone 회원 전화번호
 * @apiParam {Number} mem_mail_agree 회원 메일 수신 동의 (0: 동의X, 1: 동의)
 *
 * @apiSuccess {Number} mem_id 회원 고유값
 * @apiSuccess {String} mem_userid 회원 아이디
 * @apiSuccess {String} mem_email 회원 이메일
 * @apiSuccess {String} mem_name 회원 이름
 * @apiSuccess {String} mem_pw 회원 비밀번호
 * @apiSuccess {String} mem_profile_photo 회원 프로필 사진
 * @apiSuccess {String} mem_phone 회원 전화번호
 * @apiSuccess {Number} mem_mail_agree 회원 메일 수신 동의 (0: 동의X, 1: 동의)
 * @apiSuccess {Date} mem_create_date 회원 생성 날짜
 * @apiSuccess {Date} mem_last_connect_date 회원 마지막 접속 날짜
 * @apiSuccess {Date} mem_update 회원 업데이트
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 201 Created
 *     {
 *        "mem_profile_photo": null,
 *        "mem_id": 1,
 *        "mem_userid": "test",
 *        "mem_email": "test@gmail.com",
 *        "mem_name": "tester",
 *        "mem_pw": "$2a$10$x47fRDIs/jzt1KEaKgnV2....",
 *        "mem_phone": "000-0000-0000",
 *        "mem_mail_agree": "1",
 *        "mem_create_date": "0000-00-00T00:00:00.000Z",
 *        "mem_last_connect_date": "0000-00-00T00:00:00.000Z",
 *        "mem_update": "0000-00-00T00:00:00.000Z"
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


/**
 * @api {put} /member/:mem_id 회원 수정
 * @apiName UpdateMember
 * @apiGroup Member
 *
 * @apiHeader {String} Authorization bearer token
 * @apiHeaderExample Request-Example:
 *     "Authorization": "bearer token"
 *
 * @apiParam {Number} mem_id 회원 고유값
 * @apiParam {String} mem_email 회원 이메일
 * @apiParam {String} mem_name 회원 이름
 * @apiParam {FormData} mem_profile_photo 회원 프로필 사진
 * @apiParam {String} mem_pw 회원 비밀번호
 * @apiParam {String} mem_phone 회원 전화번호
 * @apiParam {Number} mem_mail_agree 회원 메일 수신 동의 (0: 동의X, 1: 동의)
 *
 * @apiSuccess {Number} mem_id 회원 고유값
 * @apiSuccess {String} mem_userid 회원 아이디
 * @apiSuccess {String} mem_email 회원 이메일
 * @apiSuccess {String} mem_name 회원 이름
 * @apiSuccess {String} mem_pw 회원 비밀번호
 * @apiSuccess {String} mem_profile_photo 회원 프로필 사진
 * @apiSuccess {String} mem_phone 회원 전화번호
 * @apiSuccess {Number} mem_mail_agree 회원 메일 수신 동의 (0: 동의X, 1: 동의)
 * @apiSuccess {Date} mem_create_date 회원 생성 날짜
 * @apiSuccess {Date} mem_last_connect_date 회원 마지막 접속 날짜
 * @apiSuccess {Date} mem_update 회원 업데이트
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 201 Created
 *     {
 *        "mem_profile_photo": null,
 *        "mem_id": 1,
 *        "mem_userid": "test",
 *        "mem_email": "test@gmail.com",
 *        "mem_name": "tester",
 *        "mem_pw": "$2a$10$x47fRDIs/jzt1KEaKgnV2....",
 *        "mem_phone": "000-0000-0000",
 *        "mem_mail_agree": "1",
 *        "mem_create_date": "0000-00-00T00:00:00.000Z",
 *        "mem_last_connect_date": "0000-00-00T00:00:00.000Z",
 *        "mem_update": "0000-00-00T00:00:00.000Z"
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
