from pathlib import Path
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base,sessionmaker
BASE_DIR=Path(__file__).resolve().parent.parent.parent
DATA_DIR=BASE_DIR/'data';DATA_DIR.mkdir(parents=True,exist_ok=True)
DATABASE_PATH=DATA_DIR/'civic_services.db'
engine=create_engine(f'sqlite:///{DATABASE_PATH.as_posix()}',connect_args={'check_same_thread':False})
SessionLocal=sessionmaker(autocommit=False,autoflush=False,bind=engine)
Base=declarative_base()
def get_db():
 db=SessionLocal()
 try: yield db
 finally: db.close()
