using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;

public class StartRedirection : MonoBehaviour
{
    // Start is called before the first frame update
    void Start()
    {

        //remove at end
        /* PlayerPrefs.DeleteAll();*/
        if(PlayerPrefs.GetString("lastNumber","1") == PlayerPrefs.GetString("number","0"))
        {
            SceneManager.LoadScene("Finish Page");

        }else{
            if (PlayerPrefs.GetInt("CurrentStatus", 0) == 1)
            {
                SceneManager.LoadScene("nextLocationScene");
            }
        }
       
       
       
    }

    // Update is called once per frame
    void Update()
    {
        
    }
}
