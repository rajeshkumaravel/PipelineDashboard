<?php
namespace Spec\DashboardHub\Bundle\AppBundle\Entity;

use DashboardHub\Bundle\AppBundle\Entity\User;
use PhpSpec\ObjectBehavior;
use Prophecy\Argument;

class DashboardSpec extends ObjectBehavior
{

    function it_is_initializable()
    {
        $this->shouldHaveType('DashboardHub\Bundle\AppBundle\Entity\Dashboard');
    }

    function it_should_set_then_get_id()
    {
        $data = 123;
        $this->setId($data)
             ->shouldHaveType('DashboardHub\Bundle\AppBundle\Entity\Dashboard');
        $this->getId()->shouldReturn($data);
    }

    function it_should_set_then_get_user(User $user)
    {
        $this->setUser($user)
             ->shouldHaveType('DashboardHub\Bundle\AppBundle\Entity\Dashboard');
        $this->getUser()->shouldReturn($user);
    }

    function it_should_set_then_get_name()
    {
        $data = 'testname';
        $this->setName($data)
             ->shouldHaveType('DashboardHub\Bundle\AppBundle\Entity\Dashboard');
        $this->getName()->shouldReturn($data);
    }

    function it_should_set_then_get_repo()
    {
        $data = 'testname';
        $this->setRepo($data)
             ->shouldHaveType('DashboardHub\Bundle\AppBundle\Entity\Dashboard');
        $this->getRepo()->shouldReturn($data);
    }

    function it_should_set_then_get_theme()
    {
        $data = 'testname';
        $this->setTheme($data)
             ->shouldHaveType('DashboardHub\Bundle\AppBundle\Entity\Dashboard');
        $this->getTheme()->shouldReturn($data);
    }

    function it_should_set_then_get_public()
    {
        $data = true;
        $this->setPublic($data)
             ->shouldHaveType('DashboardHub\Bundle\AppBundle\Entity\Dashboard');
        $this->isPublic()->shouldReturn($data);
    }
}
