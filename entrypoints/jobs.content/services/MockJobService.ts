import { ParsedJobView } from "@/entrypoints/jobs.content/parsers/jobviewPageParser";
import { ParsedJobRow } from "@/entrypoints/jobs.content/parsers/jobListTableParser";
import { JobService } from "@/entrypoints/jobs.content/services/JobService";

const now = new Date();
const jobs: ParsedJobRow[] = [
    {
        id: "job-123456",
        title: "Senior Frontend Developer",
        location: "San Francisco, CA",
        metadata: {
            isFavorite: true,
            isExpiring: false,
            wasRecentlyUpdated: true,
            hasSalaryInfo: true,
            isNew: false,
            isInRegion: true
        },
        company: {
            name: "TechCorp Inc.",
            jobsUrl: "https://techcorp.com/careers",
            logoUrl: "https://techcorp.com/logo.png"
        },
        dates: {
            published:now,
            deadline:now,
        }
    },
    {
        id: "job-234567",
        title: "DevOps Engineer",
        location: "Remote",
        metadata: {
            isFavorite: false,
            isExpiring: true,
            wasRecentlyUpdated: false,
            hasSalaryInfo: true,
            isNew: false,
            isInRegion: false
        },
        company: {
            name: "CloudSystems Ltd.",
            jobsUrl: "https://cloudsystems.io/jobs",
            logoUrl: "https://cloudsystems.io/images/logo.svg"
        },
        dates: {
            published:now,
            deadline:now,
        }
    },
    {
        id: "job-345678",
        title: "Data Scientist",
        location: "Boston, MA",
        metadata: {
            isFavorite: true,
            isExpiring: false,
            wasRecentlyUpdated: false,
            hasSalaryInfo: false,
            isNew: true,
            isInRegion: true
        },
        company: {
            name: "DataVision Analytics",
            jobsUrl: "https://datavision.ai/careers",
            logoUrl: "https://datavision.ai/brand/logo.png"
        },
        dates: {
            published:now,
            deadline:now,
        }
    },
    {
        id: "null",
        title: "UX/UI Designer",
        location: "New York, NY",
        metadata: {
            isFavorite: false,
            isExpiring: false,
            wasRecentlyUpdated: true,
            hasSalaryInfo: true,
            isNew: true,
            isInRegion: false
        },
        company: {
            name: "Creative Design Studio",
            jobsUrl: "https://creativedesign.co/openings",
            logoUrl: "https://creativedesign.co/assets/logo-2x.png"
        },
        dates: {
            published:now,
            deadline:now,
        }
    },
    {
        id: "job-456789",
        title: "Backend Engineer",
        location: "Seattle, WA",
        metadata: {
            isFavorite: false,
            isExpiring: false,
            wasRecentlyUpdated: false,
            hasSalaryInfo: true,
            isNew: false,
            isInRegion: true
        },
        company: {
            name: "ServerStack Technologies",
            jobsUrl: "https://serverstack.tech/jobs",
            logoUrl: "https://serverstack.tech/media/logo.jpg"
        },
        dates: {
            published:now,
            deadline:now,
        }
    },
    {
        id: "job-567890",
        title: "Full Stack Developer",
        location: "Austin, TX",
        metadata: {
            isFavorite: true,
            isExpiring: true,
            wasRecentlyUpdated: false,
            hasSalaryInfo: false,
            isNew: false,
            isInRegion: false
        },
        company: {
            name: "Innovate Software Solutions",
            jobsUrl: "https://innovatesoftware.com/careers",
            logoUrl: "https://innovatesoftware.com/static/logo.png"
        },
        dates: {
            published:now,
            deadline:now,
        }
    },
    {
        id: "job-678901",
        title: "Machine Learning Engineer",
        location: "San Jose, CA",
        metadata: {
            isFavorite: false,
            isExpiring: false,
            wasRecentlyUpdated: true,
            hasSalaryInfo: true,
            isNew: true,
            isInRegion: true
        },
        company: {
            name: "AI Futures Corp",
            jobsUrl: "https://aifutures.corp/join-us",
            logoUrl: "https://aifutures.corp/branding/logo-dark.svg"
        },
        dates: {
            published:now,
            deadline:now,
        }
    },
    {
        id: "job-789012",
        title: "Product Manager",
        location: "Chicago, IL",
        metadata: {
            isFavorite: false,
            isExpiring: false,
            wasRecentlyUpdated: false,
            hasSalaryInfo: false,
            isNew: false,
            isInRegion: true
        },
        company: {
            name: "Midway Products Group",
            jobsUrl: "https://midwayproducts.com/opportunities",
            logoUrl: "https://midwayproducts.com/images/brand/logo.png"
        },
        dates: {
            published:now,
            deadline:now,
        }
    },
    {
        id: "job-890123",
        title: "Cloud Security Specialist",
        location: "Remote",
        metadata: {
            isFavorite: true,
            isExpiring: false,
            wasRecentlyUpdated: false,
            hasSalaryInfo: true,
            isNew: false,
            isInRegion: false
        },
        company: {
            name: "SecureCloud Solutions",
            jobsUrl: "https://securecloud.io/careers",
            logoUrl: "https://securecloud.io/assets/logo.png"
        },
        dates: {
            published:now,
            deadline:now,
        }
    },
    {
        id: "job-901234",
        title: "Mobile App Developer",
        location: "Portland, OR",
        metadata: {
            isFavorite: false,
            isExpiring: true,
            wasRecentlyUpdated: true,
            hasSalaryInfo: false,
            isNew: true,
            isInRegion: true
        },
        company: {
            name: "MobileFirst Apps",
            jobsUrl: "https://mobilefirst.dev/jobs",
            logoUrl: "https://mobilefirst.dev/public/logo.svg"
        },
        dates: {
            published:now,
            deadline:now,
        }
    }
];

const jobViews: ParsedJobView[] = [
    {
        title: "Senior Frontend Developer",
        isFavorite: true,
        dates: {
            published:now,
            deadline:now,
        },
        description: "\n" +
            "\t\t\t\tკომპანია \"<b>UGT</b>\" აცხადებს ვაკანსიას <b>სუსტი დენების მიმართულების ინჟინრის</b> პოზიციაზე.<br>\n" +
            "<br>\n" +
            "კომპანიის შესახებ<br>\n" +
            "<br>\n" +
            "\"იუ-ჯი-თი\" საქართველოში ციფრული ტექნოლოგიების სფეროს ლიდერია, რომელმაც საქმიანობა IT სფეროში ოცდაშვიდი წლის წინ დაიწყო და დროთა განმავლობაში გააფართოვა მოქმედების არეალი. დღეისთვის, ჩვენ წარმატებით ვნერგავთ სხვადასხვა სექტორზე მორგებულ გადაწყვეტებს არა მხოლოდ კლასიკური IT მიმართულებით, არამედ ისეთ სფეროებში, როგორიცაა ელექტროობის და შენობების მართვის, გადახდების და ნაღდი ფულის დამუშავების, ვიდეო მონიტორინგის, მზის ენერგიის და სხვა უახლესი ტექნოლოგიები.<br>\n" +
            "<br>\n" +
            "ძირითადი ფუნქცია-მოვალეობები:<br>\n" +
            "<br>\n" +
            "** სუსტი დენების მიმართულებით კონკრეტული გადაწყვეტილებების მოფიქრება (solution) და პროექტის მომზადება, როგორც ქართულ, ასევე ინგლისურ ენაზე;<br>\n" +
            "** კლიენტისგან მიღებული არქიტექტურული ნახაზის გარჩევა;<br>\n" +
            "** პოტენციურ კლიენტებთან ურთიერთობისას პროდუქტის შეთავაზების მომზადებაში მონაწილეობის მიღება, გაყიდვების გუნდის მხარდაჭერა ტექნიკური მიმართულებით;<br>\n" +
            "** სუსტი დენების მიმართულებით სისტემების საპროექტო ნახაზის შედგენა, ტექნიკური მოწყობილობების შერჩევა, კომპონენტების სრული სიის მომზადება და პროექტის სავარაუდო ბიუჯეტის დადგენა;<br>\n" +
            "** საჭიროების შემთხვევაში გადაწყვეტილების მოსამზადებლად ობიექტის შესწავლა ინჟინერ-ინსტალატორების გუნდთან ერთად;<br>\n" +
            "** პროექტში ცვლილებების შეტანა და პროექტის მიმდინარეობის კონტროლი;<br>\n" +
            "** ობიექტზე სისტემების პროექტირება, გამართვა და კონფიგურაცია;<br>\n" +
            "** ელექტრო და BMS სისტემებში გამოყენებული სხვადასხვა მწარმოებლების პროდუქციის მახასიათებლებისა და ფუნქციების შესწავლა და სიახლეების შესახებ ცოდნის მუდმივი განახლება;<br>\n" +
            "** ელექტროობისა და BMS-ის ბაზრის შესწავლა და ანალიზი;<br>\n" +
            "** ხელმძღვანელის ინფორმირება განხორციელებული, მიმდინარე და დაგეგმილი ღონისძიებების შესახებ;<br>\n" +
            "** კომპეტენციის ფარგლებში ხელმძღვანელის სხვა დავალებების შესრულება.<br>\n" +
            "<br>\n" +
            "ენები:<br>\n" +
            "<br>\n" +
            "** ინგლისური ენის ცოდნა;<br>\n" +
            "** სამუშაო გამოცდილება: აღნიშნული მიმართულებით მუშაობის გამოცდილება;<br>\n" +
            "<br>\n" +
            "კომპეტენციები:<br>\n" +
            "<br>\n" +
            "** ანალიტიკური აზროვნების უნარი;<br>\n" +
            "** დროის ეფექტიანად მართვის უნარი;<br>\n" +
            "** სამუშაოს დაგეგმვისა და ორგანიზების უნარი;<br>\n" +
            "** სიზუსტესა და დეტალებზე ორიენტირებული;<br>\n" +
            "** როგორც დამოუკიდებლად, ასევე გუნდურად მუშაობის უნარი;<br>\n" +
            "** პასუხისმგებლობის გრძნობა.<br>\n" +
            "<br>\n" +
            "დასაქმების პირობები:<br>\n" +
            "<br>\n" +
            "** სამუშაო ადგილი: თბილისი<br>\n" +
            "** სამუშაო განაკვეთი: სრული<br>\n" +
            "<br>\n" +
            "ბენეფიტები:<br>\n" +
            "<br>\n" +
            "** ჯანმრთელობის დაზღვევა<br>\n" +
            "** Fitpass<br>\n" +
            "** დამატებითი ინფორმაცია<br>\n" +
            "<br>\n" +
            "დაინტერესებულ კანდიდატებს გთხოვთ, შეავსოთ განაცხადი <b>8 მაისის</b> ჩათვლით.<br>\n" +
            "<br>\n" +
            "განაცხადის გასაკეთებლად, საჭიროა გადახვიდეთ მოცემულ ბმულზე, დარეგისტრირდეთ ჩვენს კარიერ საიტზე და გააკეთოთ განაცხადი: <a href=\"https://career.ugt.ge/job-invite/1004/\" target=\"_blank\">https://career.ugt.ge/job-invite/1004/</a> <br>\n" +
            "<br>\n" +
            "მადლობა დაინტერესებისთვის, გისურვებთ წარმატებებს!\n" +
            "\t\t\t"
    },
    {
        title: "Data Scientist",
        isFavorite: false,
        dates: {
            published:now,
            deadline:now,
        },
        description: "\n" +
            "\t\t\t\t\"<b>გრინვეი</b>\" თანამედროვე, საერთაშორისო სტანდარტებით მოქმედი კომპანია, რომელიც მომხმარებელს სთავაზობს ხარისხიან, მოქნილ და უსაფრთხო ტექნიკური ინსპექტირების სერვისს მთელი საქართველოს მასშტაბით. გრინვეის პარტნიორია მსოფლიოს 70 ქვეყანაში მოქმედი, ავტომობილების ტექნიკური დათვალიერების მსოფლიო ლიდერი Applus+ რომლის გამოცდილების გათვალისწინებით გრინვეი საფუძველს უყრის საქართველოში პირველ, საერთაშორისო სტანდარტებით მოქმედ ავტომობილების ტექნიკური ინსპექტირების ცენტრების ქსელს. კომპანიის მიზანია თანამედროვე, მომხმარებელზე ორიენტირებული მომსახურება და საზოგადოებისთვის მნიშვნელოვან საკითხებზე ზრუნვა ერთ უწყვეტ პროცესად აქციოს.<br>\n" +
            "<br>\n" +
            "სს \"გრინვეი საქართველო\" აცხადებს ვაკანსიას <b>გრითერის/ოპერატორის</b> პოზიციაზე:<br>\n" +
            "<br>\n" +
            "ადგილმდებარეობები: <br>\n" +
            "<br>\n" +
            "** უნივერსიტეტის ქუჩა;<br>\n" +
            "** ხუდადოვი;<br>\n" +
            "** რუსთავის გზატკეცილი<br>\n" +
            "<br>\n" +
            "სამუშაო დრო: კვირაში 5 დღე (ჯამში 40 საათი, მოქნილი სამუშაო გრაფიკი)<br>\n" +
            "ანაზღაურება: <b>700 ლარი</b><br>\n" +
            "ბენეფიტები: დაზღვევა, FitPass<br>\n" +
            "<br>\n" +
            "ძირითადი ფუნქცია-მოვალეობები:<br>\n" +
            "<br>\n" +
            "** ტექდათვალიერების ცენტრში შემოსულ კლიენტებთან პირველადი კონტაქტის დამყარება;<br>\n" +
            "** კლიენტების პროგრამაში დარეგისტრირება;<br>\n" +
            "** სერვის ცენტრში არსებული რიგების რეგულირება, მართვა და კონტროლი;<br>\n" +
            "** კლიენტებისთვის კონსულტაციის გაწევა სწრაფი გადახდის აპარატსა და უნაღდო ანგარიშსწორებასთან დაკავშირებით;<br>\n" +
            "** მომსახურების სტანდარტის, ხარისხის, შრომის უსაფრთხოების ნორმების დაცვა;<br>\n" +
            "<br>\n" +
            "ძირითადი მოთხოვნები და საჭირო უნარ-ჩვევები:<br>\n" +
            "<br>\n" +
            "** საშუალო, პროფესიული, ან უმაღლესი განათლება;<br>\n" +
            "** საოფისე პროგრამების სამომხმარებლო დონეზე ცოდნა;<br>\n" +
            "** ეფექტური კომუნიკაციის უნარი;<br>\n" +
            "** ორგანიზებულობა და პუნქტუალურობა;<br>\n" +
            "** ყურადღება და დეტალებზე ორიენტირებულობა;<br>\n" +
            "** გუნდური მუშაობის უნარი.<br>\n" +
            "<br>\n" +
            "დაინტერესების შემთხვევაში, გთხოვთ გამოაგზავნეთ თქვენი CV/რეზიუმე ელექტრონულ მისამართზე: <a href=\"mailto:hr@gwg.ge?subject=\">hr@gwg.ge</a>. სათაურის ველში გთხოვთ მიუთითეთ ვაკანსიის დასახელება გრითერის/ოპერატორი, ან დაგვიკავშირდით ნომერზე 595950935<br>\n" +
            "<br>\n" +
            "გაცნობებთ რომ თქვენს მიერ გამოგზავნილი CV/რეზიუმე შესაძლოა შეიცავდეს პერსონალურ მონაცემებს, მათ შორის განსაკუთრებული კატეგორიის მონაცემებს. გთხოვთ, გაითვალისწინოთ, რომ თქვენი პერსონალური მონაცემები კომპანია \"გრინვეი საქართველოს\" მხრიდან დამუშავდება \"პერსონალურ მონაცემთა დაცვის შესახებ\" საქართველოს კანონის შესაბამისად, თქვენთან სახელშეკრულებო, მათ შორის შრომითი ურთიერთობის დამყარების შესახებ გადაწყვეტილების მიღების, სამომავლო ვაკანსიის მოთხოვნებთან შესაბამისობის დადგენისა და დასაქმებისთვის საჭირო პროცედურების წარმართვის მიზნით ყოველგვარი დისკრიმინაციის გარეშე. გრინვეი - არა დისკრიმინაციას! გაცნობებთ რომ თქვენ უფლება გაქვთ ნებისმიერ დროს მიიღოთ ინფორმაცია თქვენს შესახებ ინფორმაციის დამუშავების თაობაზე, მოითხოვოთ მისი გასწორება, წაშლა, განახლება, განადგურება. აღნიშნულ საკითხებთან დაკავშირებით შეგიძლიათ მიმართოთ სს \"გრინვეი საქართველოს\" პერსონალურ მონაცემთა დაცვის ოფიცერს: შპს \"Privacy Professionals\"; მის.: თბილისი, ვაჟა-ფშაველას გამზირი №3; ელ. ფოსტა: <a href=\"mailto:privacyprofessionalsgeo@gmail.com?subject=\">privacyprofessionalsgeo@gmail.com</a>. მონაცემების შენახვის ვადაა 3 (სამი) წელი. <br>\n" +
            "<br>\n" +
            "გისურვებთ წარმატებებს! \n" +
            "\t\t\t"

    },
    {
        title: "Data Scientist",
        isFavorite: false,
        dates: {
            published:now,
            deadline:now,
        },
        description: "\n" +
            "\t\t\t\tუძრავი ქონების გაყიდვა/გაქირავების კომპანია \"<b>Sakura Properties</b>\", რომელსაც მხოლოდ მაღალი კლასის უძრავი ქონება აქვს და მუშაობს ამერიკული მოდელით, თავის გუნდში ეძებს ენერგიულ და კომუნიკაბელურ <b>ოფისის მენეჯერს</b>.<br>\n" +
            "<br>\n" +
            "მოვალეობები:<br>\n" +
            "<br>\n" +
            "** ზარებზე პასუხი და კლიენტებისთვის ინფორმაციის მიწოდება<br>\n" +
            "** უძრავი ქონების ბაზების შექმნა (ჩვენ მოგაწვდით ინფორმაციას)<br>\n" +
            "** კომპანიაში მომუშავე გაყიდვების სპეციალისტებთან კომუნიკაცია და მათთვის სხვადასხვა უძრავ ქონებაზე ინფორმაციის მიწოდება<br>\n" +
            "** ონლაინ პორტალებზე სხვადასხვა მნიშვნელოვანი ინფორმაციის ძიება და განთავსება<br>\n" +
            "** ქონებების მუდმივი მონიტორინგი<br>\n" +
            "** კომპანიებთან მოლაპარაკების წარმოება<br>\n" +
            "<br>\n" +
            "რა არის მნიშვნელოვანი ამ პოზიციის ადამიანისთვის:<br>\n" +
            "<br>\n" +
            "** კომუნიკაბელურობა - ახალი ადამიანების გაცნობა მათთვის სიამოვნება უნდა იყოს (ძირითადად ესაუბრებით მაღალი კლასის უძრავი ქონების მესაკუთრეებს)<br>\n" +
            "** ცნობისმოყვარეობა - უნდა გაინტერესებდეთ უძრავი ქონების სხვადასხვა მიმართულების მუშაობის პრინციპი (ჩვენ გასწავლით)<br>\n" +
            "** საოფისე პროგრამების ცოდნა - Google Docs, Google Sheets, Google Drive, Gmail<br>\n" +
            "** ინგლისურის ცოდნა ჩაითვლება პლიუსად, თუმცა არ არის სავალდებულო<br>\n" +
            "<br>\n" +
            "რას მიიღებთ ჩვენი მხრიდან:<br>\n" +
            "<br>\n" +
            "** სამოტივაციო აქტივობები და წამახალისებელი ბონუსები<br>\n" +
            "** თანამედროვე ტექნოლოგიებზე წვდომა (რაც სამწუხაროდ, იშვიათია ამ სფეროში)<br>\n" +
            "** კლიენტების და უძრავი ქონების ერთეულების დიდ მზა ბაზაზე წვდომა<br>\n" +
            "** მეგობრული და მხარდამჭერი გუნდი<br>\n" +
            "** ანაზღაურება: <b>600 ლარი</b> + ბონუსი (ბონუსი ჯამურად ყოველთვიურად საშუალოდ 900-1300 ლარამდე)<br>\n" +
            "** ტრანსპორტი: ულიმიტო აბონემენტი<br>\n" +
            "<br>\n" +
            "ჩვენი ინსტაგრამი: <a href=\"https://www.instagram.com/sakura.properties/\" target=\"_blank\">https://www.instagram.com/sakura.properties/</a><br>\n" +
            "<br>\n" +
            "სამუშაო გრაფიკი:<br>\n" +
            "<br>\n" +
            "** ჰიბრიდული 3 დღე ოფისიდან, 2 დღე სახლიდან.<br>\n" +
            "** დასვენების დღე კვირაში 2 დღე შაბათ-კვირის გარდა 10:00-18:00, ან 11:00-19:00 (თქვენ ირჩევთ)<br>\n" +
            "<br>\n" +
            "ჩვენი ოფისი მდებარეობს საბურთალოზე, სპორტის სასახლესთან.\n" +
            "\t\t\t"
    },
];


export class MockJobService implements JobService {
    getLocal(): string {
        return 'en';
    }

    async fetchJobList(): Promise<ParsedJobRow[]> {
        await new Promise(resolve => setTimeout(resolve, 300));
        return jobs;
    }

    async fetchJobById(jobId: string): Promise<ParsedJobView> {
        await new Promise(resolve => setTimeout(resolve, 300));
        const jobCount = 3
        return jobViews[Math.floor(Math.random() * jobCount)];
    }
}

export const jobService = new MockJobService();
