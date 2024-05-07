using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;

public class LoadingScane : MonoBehaviour
{
    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        
    }

     public void StartPage()
    {
        SceneManager.LoadScene("Start Page");
    }
     public void ScannerQr()
    {
        SceneManager.LoadScene("ScannerQr");
    }
    public void QuestionPage()
    {
        SceneManager.LoadScene("Question Page");
    }
     public void NextLocationPage()
    {
        SceneManager.LoadScene("nextLocationScene");
    }
     public void SettingsPage()
    {
        SceneManager.LoadScene("Settings Page");
    }

    public void Exit()
    {
        Application.Quit();
    }
   
}
