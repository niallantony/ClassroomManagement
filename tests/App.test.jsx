import { vi, describe, it, expect } from 'vitest';
import { render, screen } from "@testing-library/react";
import { createMemoryRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom';
import App from '../src/App';
import { Sidebar } from '../src/Sidebar';
import { Classroom } from '../src/Classroom';

describe("sidebar", () => {
    it("Should render the title 'Class List'", () => {
        render(<Sidebar />);
        expect(screen.getByRole("heading").textContent).toMatch("Class List");
    })

})

describe("app", () => {
    it("Should render a sidebar and viewport", () => {
        vi.mock("react-router-dom", async () => {
            const module = await vi.importActual("react-router-dom");
            return {
                ...module,
                useLoaderData: vi.fn(() => {
                    return {
                        classrooms:[
                            {
                                key:"1",
                                name:"Class one"
                            },
                            {
                                key:"2",
                                name:"Class two"
                            }
                        ]
                    }
                })
            }
        })

        const router = createMemoryRouter(
            createRoutesFromElements(
                <Route path="/" element={<App />}>
                    <Route path="classroom/:classroomID" element={<Classroom />} />
                </Route>
            ),
            {
                initialEntries: ['/'],
            }
        )

        render(<RouterProvider router={router} />);

        expect(screen.getByRole("navigation").textContent).toContain("Class List");
    });

    it("Should render a list of classes in the sidebar", () => {
        const router = createMemoryRouter(
            createRoutesFromElements(
                <Route path="/" element={<App />}>
                    <Route path="classroom/:classroomID" element={<Classroom />} />
                </Route>
            ),
            {
                initialEntries: ['/'],
            }
        ) 

        render(<RouterProvider router={router} />);

        const links = screen.getAllByRole("link");
        expect(screen.getByRole("navigation")).toContain(links[0])
        expect(links.length).toBe(2);
    })

})

describe("classroom", () => {
    it("Should render the name of the classroom", () => {
        render(<Classroom />)
    })
})