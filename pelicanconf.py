AUTHOR = 'Lucas Oskorep'
SITENAME = 'Lucas Oskorep'


PATH = "content"

TIMEZONE = 'America/New_York'

DEFAULT_LANG = 'en'

# Theme settings
THEME = './pelican-hyde'
DISPLAY_PAGES_ON_MENU = 'true'
BIO = ('Software Engineer'
       '<br>'
       'Daily Affirmation:'
       '<b>Devops is a Meaningful Term</b>')

MENUITEMS = [
    ("About",  "/")
]

# FONT_AWESOME_CSS='https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.2/css/fontawesome.min.css'
# FONT_ACADEMICONS='true'
# Feed generation is usually not desired when developing
FEED_ALL_ATOM = None
CATEGORY_FEED_ATOM = None
TRANSLATION_FEED_ATOM = None
AUTHOR_FEED_ATOM = None
AUTHOR_FEED_RSS = None

# Blogroll
LINKS = (
    ("Pelican", "https://getpelican.com/"),
    ("Python.org", "https://www.python.org/"),
    ("Jinja2", "https://palletsprojects.com/p/jinja/"),
    ("You can modify those links in your config file", "#"),
)

# Social widget
SOCIAL = (
    ("github", "https://github.com/lucasoskorep"),
    ("gitlab", "https://gitlab.com/lucasoskorep"),
    ("gitea", "https://gitea.chaosdev.gay/lucasoskorep"),
    ("lastfm", "https://www.last.fm/user/chaos2theory"),
    ("linkedin", "https://www.linkedin.com/in/lucas-oskorep/"),
)

DEFAULT_PAGINATION = False

# DIRECT_TEMPLATES = ['index', 'projects']
# PAGINATED_TEMPLATES = ['projects']

# Uncomment following line if you want document-relative URLs when developing
# RELATIVE_URLS = True
