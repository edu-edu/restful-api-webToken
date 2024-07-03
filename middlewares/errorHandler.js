const { constants } = require("../constants");

const errorHandler = (err, req, res, next) => {
    const statusCodes = res.statusCodes ? res.statusCodes : 500;
    switch (statusCodes) {
      case constants.VALIDATION_ERROR:
        res.json({
          title: "VALIDATION FAILURE",
          message: err.message,
          stackTrace: err.stack,
        });
        break;

      case constants.UNAUTHORIZED:
        res.json({
          title: "UNAUTHORIZED ACCESS",
          message: err.message,
          stackTrace: err.stack,
        });
        break;

            case constants.FORBIDDEN:
        res.json({
          title: "FORBIDDEN",
          message: err.message,
          stackTrace: err.stack,
        });
        break;

      case constants.PAGE_NOT_FOUND:
        res.json({
          title: "PAGE_NOT_FOUND",
          message: err.message,
          stackTrace: err.stack,
        });
        break;

      case constants.SERVER_ERROR:
        res.json({
          title: "SERVER_ERROR",
          message: err.message,
          stackTrace: err.stack,
        });
        break;

      default :
        res.json({
            title: "NO ERROR",
            message: "ALL IS GOOD"
        });
        break;
    };
};

module.exports = errorHandler;;