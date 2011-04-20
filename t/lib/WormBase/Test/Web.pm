package WormBase::Test::Web;

use strict;
use warnings;
use Readonly;

use Test::WWW::Mechanize::Catalyst;

use base 'WormBase::Test';

Readonly our $APP_BASE => 'WormBase::Web';
sub APP_BASE () { return $APP_BASE; }

my %Mech_options = (allow_external => 1);

my $Mech = $ENV{CATALYST_SERVER} ? Test::WWW::Mechanize::Catalyst->new({%Mech_options})
         : Test::WWW::Mechanize::Catalyst->new({catalyst_app => $APP_BASE,
                                                %Mech_options});

sub new {
    my $class = shift;
    return bless {}, $class;
}

sub mech {
    return $Mech;
}

1;
