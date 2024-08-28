FROM python:3
WORKDIR /usr/src/app
COPY . .
RUN pip install -r requirements.txt
CMD ["flask_app.py"]
ENTRYPOINT ["python3"]