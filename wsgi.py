from operation import app
import logging

if __name__ == "__main__":
    handler = logging.FileHandler('statement.log', encoding='UTF-8')
    handler.setLevel(logging.DEBUG)
    logging_format = logging.Formatter(
        '[%(asctime)s] [%(message)s]')
    handler.setFormatter(logging_format)
    app.logger.addHandler(handler)
    app.run(port=8888, host='0.0.0.0', threaded=True)
