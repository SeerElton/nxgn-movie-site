namespace nxgnserver.Data
{
    /**
     * summary - movies database table 
     *
     */    
    public class MoviesDataModel
    {
    
        /* the unique id for the table */
        public string id { set; get; }


        /* movie name */
        public string name { set; get; }


        /* movie summary */
        public string about { set; get; }

        /* movie summary */
        public string image { set; get; }

    }

}
