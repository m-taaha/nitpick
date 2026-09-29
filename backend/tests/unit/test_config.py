from app.config import Settings

def test_settings_load_from_env_file(tmp_path):
     env_file = tmp_path / ".env"
     
     env_file.write_text(
         "ENVIRONMENT=test\nSECRET_KEY=secret\n"
     )
     
     test_settings = Settings(_env_file=env_file)
     
     assert test_settings.ENVIRONMENT == "test"
     assert test_settings.SECRET_KEY == "secret"
     
     
